import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CreateBook from './pages/CreateBooks.jsx'
import ShowBook from './pages/ShowBook.jsx'
import EditBook from './pages/EditBook.jsx'
import DeleteBook from './pages/DeleteBook.jsx'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar.jsx'
import SingIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { useEffect, useState } from 'react'
import MyBooks from './pages/MyBooks.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // عند تحميل الصفحة، تحقق إذا كان يوجد بيانات للمستخدم في localStorage
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // تحديث حالة المستخدم
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/signIn')
    setUser(null); // تحديث حالة المستخدم عند تسجيل الخروج
  };

  return (
    <>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SingIn login={login}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-books" element={<MyBooks/>}/>

        <Route path='/books/create' element={<CreateBook />} />
        <Route path='/books/details/:id' element={<ShowBook />} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
      </Routes >
      <ToastContainer />
    </>

  )
}
