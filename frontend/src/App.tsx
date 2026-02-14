import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { WhatsAppButton } from './components/WhatsAppButton';
import AdminLogin from './pages/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AuthGuard } from './components/auth/AuthGuard';

// Wrapper for Landing Page components
const LandingPage = () => (
    <>
        <Navbar />
        <main className="flex-grow">
            <Hero />
            <Services />
            <Pricing />
            {/* Sections like About, Contact, etc can be added here */}
        </main>
        <footer className="bg-gray-900 text-white py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4">Maulana Laundry</h3>
                        <p className="text-gray-400">Pusat layanan laundry premium di Bogor. Kami memberikan hasil terbaik untuk pakaian Anda dengan proses yang profesional dan cepat.</p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Navigasi</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#beranda" className="hover:text-primary transition">Beranda</a></li>
                            <li><a href="#layanan" className="hover:text-primary transition">Layanan</a></li>
                            <li><a href="#harga" className="hover:text-primary transition">Harga</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Kontak</h4>
                        <p className="text-gray-400">Jl. Raya Bogor No. 123, <br />Kota Bogor, Jawa Barat</p>
                        <p className="text-gray-400 mt-2">WA: +62 812-3456-789</p>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Maulana Laundry. All rights reserved.</p>
                </div>
            </div>
        </footer>
        <WhatsAppButton />
    </>
);

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Helmet>
                    <title>Maulana Laundry | Jasa Laundry Premium Bogor</title>
                    <meta name="description" content="Jasa laundry terbaik, cepat, bersih, dan wangi di Bogor." />
                    <meta name="theme-color" content="#0ea5e9" />
                    <link rel="icon" type="image/png" href="/favicon.png" />
                </Helmet>

                <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />

                        {/* Admin Auth */}
                        <Route path="/admin/login" element={<AdminLogin />} />

                        {/* Protected Admin Routes */}
                        <Route element={<AuthGuard />}>
                            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                            <Route path="/admin/dashboard" element={<AdminLayout />} />
                        </Route>

                        {/* 404 Redirect */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
