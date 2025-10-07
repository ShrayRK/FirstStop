import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Nav from './components/Nav'
import { Footer } from './components/Footer'

import { Home } from './pages/Home'
import { Products } from './pages/ProductsList'
import { ProductDetails } from './pages/ProductDetails'
import { Cart } from './pages/Cart'
import { WishList } from './pages/WishList'
import { Login } from './pages/Login'
import { UserProfile } from './pages/UserProfile'
import { Checkout } from './pages/Checkout' 

import { CartProvider } from './context/CartContext'
import { WishListProvider } from './context/WishListContext'
import { SearchProvider } from './context/SearchContext'
import { LoginProvider } from './context/LoginContext'

function App() {
  
  return (
    <LoginProvider>
    <CartProvider>
    <WishListProvider> 
    <SearchProvider>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productList" element={<Products />} />
        <Route path="/productList/:category" element={<Products />} />
        <Route path="/productDetails/:brand" element={<ProductDetails />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/checkout" element={<Checkout />} /> 
      </Routes>
      <Footer />
    </Router>
    </SearchProvider>
    </WishListProvider>
    </CartProvider>
    </LoginProvider>
  )
}

export default App;
