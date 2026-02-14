import { motion } from 'framer-motion';
import { Shirt, Droplets, Sparkles, Clock } from 'lucide-react';

const services = [
    {
        title: "Cuci Komplit",
        description: "Layanan cuci dan setrika rapi. Pakaian siap pakai, bersih, dan harum.",
        icon: Shirt,
        color: "blue"
    },
    {
        title: "Cuci Kering",
        description: "Hanya cuci dan keringkan. Cocok untuk pakaian harian yang banyak.",
        icon: Droplets,
        color: "sky"
    },
    {
        title: "Setrika Saja",
        description: "Pakaian sudah dicuci? Kami bantu setrika hingga licin dan rapi.",
        icon: Sparkles,
        color: "indigo"
    },
    {
        title: "Kilat 6 Jam",
        description: "Butuh cepat? Layanan ekspres kami selesai dalam hitungan jam.",
        icon: Clock,
        color: "cyan"
    }
];

export const Services = () => {
    return (
        <section id="layanan" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-gray-900 mb-4"
                    >
                        Layanan Unggulan Kami
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        Kami menyediakan berbagai pilihan layanan laundry untuk memenuhi kebutuhan perawatan pakaian Anda.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
