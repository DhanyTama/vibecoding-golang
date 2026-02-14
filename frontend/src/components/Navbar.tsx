import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

// Use a placeholder for now, replace with actual asset import
let logo = "https://placehold.co/40x40/0ea5e9/white?text=ML";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = ['Beranda', 'Layanan', 'Harga', 'Tentang', 'Kontak'];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-40">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-2">
                        <img src={logo} alt="Maulana Laundry" className="h-10 w-10 object-contain" />
                        <span className="text-2xl font-bold text-primary">Maulana Laundry</span>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {menuItems.map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-primary transition-colors duration-200">
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-primary">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t"
                    >
                        <div className="flex flex-col space-y-4 p-4">
                            {menuItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-gray-600 hover:text-primary block"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};
