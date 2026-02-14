import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
    const { user } = useAuth();

    if (!user) return <div>Please login</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Welcome, {user.name} ({user.role})</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 border rounded shadow bg-white">
                    <h2 className="text-xl font-semibold mb-2">My Bookings</h2>
                    <p>Coming soon...</p>
                </div>
                {user.role === 'ADMIN' && (
                    <div className="p-6 border rounded shadow bg-white">
                        <h2 className="text-xl font-semibold mb-2">Manage Packages</h2>
                        <p>Coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
