import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import BlogDetails from './Pages/Blogs/BlogDetails'
import Login from './Pages/Login'
import Contact from './Pages/Contact'
import CreateBlog from './Pages/Blogs/CreateBlog'
import Register from './Pages/Register'
import BlogList from './Pages/Blogs/BlogList'
import EditBlog from './Pages/Blogs/EditBlog'
import Footer from './Components/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blogs' element={<BlogList />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/createblog' element={<CreateBlog />} />

        {/* Make Edit Blog consistent under /blogs */}
        <Route path='/editblog/:id' element={<EditBlog />} />

        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
