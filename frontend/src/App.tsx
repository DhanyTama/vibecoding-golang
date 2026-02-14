import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

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
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Hero />} />
                            {/* Additional routes can be added here */}
                        </Routes>
                    </main>

                    <footer className="bg-gray-900 text-white py-8 mt-auto">
                        <div className="container mx-auto px-4 text-center">
                            <p>&copy; {new Date().getFullYear()} Maulana Laundry. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
