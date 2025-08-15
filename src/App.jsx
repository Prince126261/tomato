import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { Bounce, ToastContainer } from 'react-toastify'
import Verify from './pages/Verify/Verify'
import Orders from './pages/Myorders/Orders'
import { StoreContext } from './context/StoreContext'
import ProtectedRoute from '../private'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);
  const token = localStorage.getItem("token");
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={8}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/order' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
          <Route path="/verify" element={<ProtectedRoute><Verify /></ProtectedRoute>} />
          <Route path='/myorders' element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App