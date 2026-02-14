import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "Reguler",
        price: "7.000",
        unit: "kg",
        features: ["Proses 2-3 Hari", "Cuci & Setrika", "Lipat Rapi", "Packing Plastik"],
        recommended: false
    },
    {
        name: "Kilat",
        price: "12.000",
        unit: "kg",
        features: ["Proses 24 Jam", "Cuci & Setrika", "Lipat Rapi", "Packing Spesial", "Pewangi Premium"],
        recommended: true
    },
    {
        name: "Ekspres",
        price: "20.000",
        unit: "kg",
        features: ["Proses 6-8 Jam", "Cuci & Setrika", "Langsung Jadi", "Layanan Prioritas"],
        recommended: false
    }
];

export const Pricing = () => {
    return (
        <section id="harga" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Harga Terjangkau</h2>
                    <p className="text-gray-600">Pilih paket yang paling sesuai dengan kebutuhan dan waktu Anda.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative p-8 rounded-3xl bg-white border ${plan.recommended ? 'border-primary shadow-2xl scale-105' : 'border-slate-100 shadow-sm'} overflow-hidden`}
                        >
                            {plan.recommended && (
                                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-bold rounded-bl-xl">
                                    PALING POPULER
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                            <div className="flex items-baseline mb-8">
                                <span className="text-4xl font-bold text-gray-900">Rp {plan.price}</span>
                                <span className="text-gray-500 ml-2">/{plan.unit}</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-gray-600">
                                        <Check size={18} className="text-green-500 mr-3" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.recommended ? 'bg-primary text-white hover:bg-primary/90' : 'bg-slate-100 text-gray-900 hover:bg-slate-200'}`}>
                                Pilih Paket
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
