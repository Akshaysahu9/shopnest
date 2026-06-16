import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import ScrollToTop from './components/ScrollToTop'
import PageTitle from './components/PageTitle'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import SearchPage from './pages/SearchPage'
import DealsPage from './pages/DealsPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OrdersPage from './pages/OrdersPage'

export default function App() {
  return (
    <div className="app">
      <PageTitle />
      <Header />
      <main className="main-content">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <ScrollToTop />
      <Toast />
    </div>
  )
}
