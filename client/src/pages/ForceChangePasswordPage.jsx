import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

const ForceChangePasswordPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await api.put('/auth/force-change-password', { newPassword });
            setSuccess(true);
            setTimeout(() => {
                logout(); // Log out after change to force re-login with new password (clean state)
                navigate('/login');
            }, 3000);
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-32">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                        {success ? <CheckCircle2 size={32} /> : <ShieldAlert size={32} />}
                    </div>
                    <h2 className="text-2xl font-serif font-black text-slate-900">
                        {success ? 'Success!' : 'Security Update Required'}
                    </h2>
                    <p className="text-slate-500 text-sm mt-2">
                        {success
                            ? 'Your password has been updated. Redirecting to login...'
                            : 'An administrator has reset your password. You must set a new one to continue.'}
                    </p>
                </div>

                {!success && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
                                <ShieldAlert size={14} />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type="password"
                                    className="w-full p-4 pl-12 rounded-2xl border border-slate-100 focus:border-secondary outline-none transition-all"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    required
                                    type="password"
                                    className="w-full p-4 pl-12 rounded-2xl border border-slate-100 focus:border-secondary outline-none transition-all"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Set New Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForceChangePasswordPage;
