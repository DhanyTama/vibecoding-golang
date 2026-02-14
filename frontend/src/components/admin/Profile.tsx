import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { Button, Input, Card } from '../ui';
import { useAppStore } from '../../store/useAppStore';
import { api } from '../../lib/api';

export const Profile = () => {
    const { user, setUser } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Profile Form State
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    // Password Form State
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        // Mocking profile update for now
        setTimeout(() => {
            setUser({ ...user, name, email });
            setIsLoading(false);
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
        }, 1000);
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Konfirmasi password tidak cocok!' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await api.post('/auth/change-password', {
                old_password: oldPassword,
                new_password: newPassword,
            });

            if (response.data.status === 'success') {
                setMessage({ type: 'success', text: 'Password berhasil diubah!' });
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (err: any) {
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Gagal mengubah password'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Pengaturan Profil</h1>
                    <p className="text-slate-500">Kelola informasi akun dan keamanan Anda.</p>
                </div>
            </div>

            {message.text && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center space-x-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}
                >
                    {message.type === 'success' && <CheckCircle2 size={20} />}
                    <span className="font-medium">{message.text}</span>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Profile Info */}
                <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-blue-50 text-primary rounded-lg">
                            <User size={20} />
                        </div>
                        <h3 className="text-lg font-bold">Informasi Pribadi</h3>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditing}
                                placeholder="Admin Maulana"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEditing}
                                placeholder="admin@laundry.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Role</label>
                            <Input value={user?.role} disabled className="bg-slate-50 border-slate-100" />
                        </div>

                        <div className="pt-4 flex justify-end">
                            {isEditing ? (
                                <div className="flex space-x-2">
                                    <Button variant="ghost" type="button" onClick={() => setIsEditing(false)}>Batal</Button>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                                        Simpan
                                    </Button>
                                </div>
                            ) : (
                                <Button type="button" onClick={() => setIsEditing(true)}>Edit Profil</Button>
                            )}
                        </div>
                    </form>
                </Card>

                {/* Change Password */}
                <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                            <Lock size={20} />
                        </div>
                        <h3 className="text-lg font-bold">Keamanan Password</h3>
                    </div>

                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Password Lama</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Password Baru</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Konfirmasi Password Baru</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button variant="danger" type="submit" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Lock className="mr-2" size={18} />}
                                Ganti Password
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};
