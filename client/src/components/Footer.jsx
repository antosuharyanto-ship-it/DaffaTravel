const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p>&copy; {new Date().getFullYear()} Daffa Tour & Travel. All rights reserved.</p>
                <div className="mt-4 flex justify-center space-x-4">
                    <a href="#" className="hover:text-secondary">Facebook</a>
                    <a href="#" className="hover:text-secondary">Instagram</a>
                    <a href="#" className="hover:text-secondary">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
