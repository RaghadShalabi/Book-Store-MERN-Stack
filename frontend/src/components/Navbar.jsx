import { Link } from "react-router-dom";
import { BsPerson, BsBox } from "react-icons/bs";

const Navbar = ({ user, signout }) => {

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/">Book Store</Link>
                </div>
                {/* Desktop Navbar Links */}
                <div className="hidden md:flex space-x-4">
                    {user ? (
                        <>
                            <Link to={"/profile"} className="hover:bg-gray-700 px-3 py-2 rounded-md">
                                <BsPerson className="inline-block mr-1" /> Profile
                            </Link>
                            <Link to={"/my-books"} className="hover:bg-gray-700 px-3 py-2 rounded-md">
                                <BsBox className="inline-block mr-1" /> My Books
                            </Link>
                            <button
                                onClick={signout}
                                className="hover:bg-gray-700 px-3 py-2 rounded-md"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to={"/signIn"} className="hover:bg-gray-700 px-3 py-2 rounded-md">
                                Sign In
                            </Link>
                            <Link to={"/signUp"} className="hover:bg-gray-700 px-3 py-2 rounded-md">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;