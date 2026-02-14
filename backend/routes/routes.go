package routes

import (
	"laundry-backend/handlers"
	"laundry-backend/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	// Auth
	auth := api.Group("/auth")
	auth.Post("/login", handlers.Login)
	auth.Post("/change-password", middleware.Protected(), handlers.ChangePassword)

	// User Management (Protected)
	userGroup := api.Group("/users", middleware.Protected())
	userGroup.Get("/", handlers.ListUsers)
	userGroup.Post("/", handlers.CreateUser)
	userGroup.Get("/:id", handlers.GetUser)
	userGroup.Put("/:id", handlers.UpdateUser)
	userGroup.Delete("/:id", handlers.ArchiveUser)
	userGroup.Post("/:id/restore", handlers.RestoreUser)
	userGroup.Delete("/:id/permanent", handlers.DeleteUserPermanent)
}
