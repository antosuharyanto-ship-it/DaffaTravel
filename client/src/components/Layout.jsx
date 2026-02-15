import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default Layout;
