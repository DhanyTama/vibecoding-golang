package handlers

import (
	"laundry-backend/database"
	"laundry-backend/models"
	"laundry-backend/utils"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// ListUsers handles fetching users with pagination, filtering, and sorting
func ListUsers(c *fiber.Ctx) error {
	var users []models.User
	db := database.DB

	// Filters
	search := c.Query("search")
	role := c.Query("role")
	status := c.Query("status", "active") // active, archived, all

	// Pagination
	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit, _ := strconv.Atoi(c.Query("limit", "10"))
	offset := (page - 1) * limit

	// Sorting
	sortBy := c.Query("sort_by", "created_at")
	order := c.Query("order", "desc")

	// Status Filter
	switch status {
	case "archived":
		db = db.Unscoped().Where("deleted_at IS NOT NULL")
	case "all":
		db = db.Unscoped()
	default:
		// default to active
		db = db.Where("deleted_at IS NULL")
	}

	// Search Filter
	if search != "" {
		db = db.Where("name ILIKE ? OR email ILIKE ?", "%"+search+"%", "%"+search+"%")
	}

	// Role Filter
	if role != "" {
		db = db.Where("role = ?", role)
	}

	// Total Count
	var total int64
	db.Model(&models.User{}).Count(&total)

	// Fetch Data
	if err := db.Order(sortBy + " " + order).Limit(limit).Offset(offset).Find(&users).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Could not fetch users",
		})
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"data": fiber.Map{
			"users": users,
			"meta": fiber.Map{
				"total": total,
				"page":  page,
				"limit": limit,
			},
		},
	})
}

// CreateUser handles creating a new user
func CreateUser(c *fiber.Ctx) error {
	type CreateUserInput struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Role     string `json:"role"`
	}

	var input CreateUserInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid input",
		})
	}

	// Double check email uniqueness (GORM will error, but good to handle)
	var existingUser models.User
	if err := database.DB.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"status":  "error",
			"message": "Email already registered",
		})
	}

	hashedPassword, _ := utils.HashPassword(input.Password)

	user := models.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: hashedPassword,
		Role:     input.Role,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Could not create user",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"status":  "success",
		"message": "User created successfully",
		"data":    user,
	})
}

// GetUser handles fetching a single user by ID
func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User

	if err := database.DB.Unscoped().First(&user, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "User not found",
		})
	}

	return c.JSON(fiber.Map{
		"status": "success",
		"data":   user,
	})
}

// UpdateUser handles updating user information
func UpdateUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User

	if err := database.DB.First(&user, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "User not found",
		})
	}

	type UpdateUserInput struct {
		Name  string `json:"name"`
		Email string `json:"email"`
		Role  string `json:"role"`
	}

	var input UpdateUserInput
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Invalid input",
		})
	}

	user.Name = input.Name
	user.Email = input.Email
	user.Role = input.Role

	if err := database.DB.Save(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Could not update user",
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User updated successfully",
		"data":    user,
	})
}

// ArchiveUser (Soft Delete)
func ArchiveUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User

	if err := database.DB.First(&user, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "User not found",
		})
	}

	if err := database.DB.Delete(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Could not archive user",
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User archived successfully",
	})
}

// RestoreUser handles restoring a soft-deleted user
func RestoreUser(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User

	if err := database.DB.Unscoped().First(&user, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "User not found",
		})
	}

	if err := database.DB.Model(&user).Unscoped().Update("deleted_at", nil).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Could not restore user",
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User restored successfully",
	})
}

// DeleteUserPermanent (Hard Delete)
// DeleteUserPermanent handles the hard deletion of a user from the database
func DeleteUserPermanent(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User

	if err := database.DB.Unscoped().First(&user, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status":  "error",
			"message": "User not found",
		})
	}

	if err := database.DB.Unscoped().Delete(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Could not permanently delete user",
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "User permanently deleted",
	})
}
