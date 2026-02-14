import { motion } from 'framer-motion';

// Use a placeholder for hero image
const heroImg = "https://images.unsplash.com/photo-1545173168-9f1947eebb8f?q=80&w=2071&auto=format&fit=crop";

export const Hero = () => {
    return (
        <section id="beranda" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img src={heroImg} alt="Laundry background" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/40 to-blue-100/80" />
            </div>

            <div className="container mx-auto px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                        Laundry Bersih, <br />
                        <span className="text-primary">Hidup Lebih Mudah</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Layanan laundry premium dengan teknologi modern. Kami merawat pakaian Anda dengan penuh perhatian dan profesionalisme.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Pesan Sekarang
                        </button>
                        <button className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-full font-semibold hover:bg-blue-50 transition shadow-md">
                            Lihat Harga
                        </button>
                    </div>
                </motion.div>

                {/* Floating Elements Animation */}
                <motion.div
                    className="absolute top-1/4 left-10 w-12 h-12 bg-blue-200 rounded-full blur-xl opacity-50 animate-float"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 1 }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl opacity-50 animate-float"
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 1.2 }}
                />
            </div>
        </section>
    );
};
