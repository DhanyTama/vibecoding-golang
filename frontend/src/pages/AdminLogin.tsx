import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { Button, Input, Card } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import { api } from '../lib/api';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const setUser = useAppStore((state) => state.setUser);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });
            const { status, message, data: token } = response.data;

            if (status === 'success') {
                localStorage.setItem('token', token);
                // In a real app, you'd fetch user profile here. 
                // For this demo, we'll set a mock user object.
                const mockUser = { name: 'Admin', email: email, role: 'admin' };
                setUser(mockUser);
                navigate('/admin/dashboard');
            } else {
                setError(message || 'Login failed');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials or server error');
        } finally {
            setIsLoading(false);
        }
    };

    const fillDemo = () => {
        setEmail('admin@laundry.com');
        setPassword('admin123');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-4">
                        <ArrowLeft size={16} className="mr-1" /> Kembali ke Beranda
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Maulana Laundry</h1>
                    <p className="text-slate-500 mt-2">Admin Dashboard Access</p>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 flex items-center">
                                <Mail size={16} className="mr-2 text-slate-400" /> Email Address
                            </label>
                            <Input
                                type="email"
                                placeholder="admin@laundry.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 flex items-center">
                                <Lock size={16} className="mr-2 text-slate-400" /> Password
                            </label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button type="submit" className="w-full py-6 text-lg" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 size={20} className="animate-spin mr-2" />
                            ) : (
                                <LogIn size={20} className="mr-2" />
                            )}
                            {isLoading ? 'Processing...' : 'Login to Dashboard'}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <button
                            onClick={fillDemo}
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Use Demo Account (Admin)
                        </button>
                    </div>
                </Card>

                <p className="text-center mt-8 text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} Maulana Laundry Admin Portal.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
