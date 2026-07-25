import { Routes, Route } from "react-router-dom";

import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/admin/AdminLayout";

import AdminRoute from "./components/AdminRoute";


// User Pages
import Home from "./pages/Home";
import About from "./pages/About";
import CategoryPage from "./pages/CategoryPage";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import NotFound from "./pages/NotFound";


// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Categories from "./pages/admin/Categories";
import Reviews from "./pages/admin/Reviews";
import Analytics from "./pages/admin/Analytics";
import Coupons from "./pages/admin/Coupons";
import Inventory from "./pages/admin/Inventory";
import BannerManagement from "./pages/admin/BannerManagement";
import Settings from "./pages/admin/Settings";
import AdminProfile from "./pages/admin/AdminProfile";
import Notifications from "./pages/admin/Notifications";
import SalesReport from "./pages/admin/SalesReport";
import RefundManagement from "./pages/admin/RefundManagement";
import AdminManagement from "./pages/admin/AdminManagement";



function App() {


  return (

    <Routes>


      {/* USER ROUTES */}

      <Route path="/" element={<UserLayout />}>

        <Route index element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="pottery" element={<CategoryPage />} />

        <Route path="handloom" element={<CategoryPage />} />

        <Route path="jewellery" element={<CategoryPage />} />

        <Route path="wood-craft" element={<CategoryPage />} />

        <Route path="painting" element={<CategoryPage />} />

        <Route path="gifts" element={<CategoryPage />} />

        <Route path="decor" element={<CategoryPage />} />

        <Route path="baskets" element={<CategoryPage />} />

        <Route path="product/:id" element={<Product />} />

        <Route path="cart" element={<Cart />} />

        <Route path="wishlist" element={<Wishlist />} />

        <Route path="checkout" element={<Checkout />} />

        <Route path="profile" element={<Profile />} />

        <Route path="login" element={<Login />} />

        <Route path="register" element={<Register />} />

        <Route path="contact" element={<Contact />} />

        <Route path="search" element={<Search />} />

        <Route path="faq" element={<FAQ />} />

        <Route path="privacy-policy" element={<PrivacyPolicy />} />

        <Route path="terms" element={<Terms />} />

        <Route path="order-success" element={<OrderSuccess />} />

        <Route path="my-orders" element={<MyOrders />} />


      </Route>





      {/* ADMIN LOGIN */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />





      {/* ADMIN ROUTES */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >


        <Route index element={<Dashboard />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="products" element={<Products />} />

        <Route path="add-product" element={<AddProduct />} />

        <Route path="edit-product/:id" element={<EditProduct />} />

        <Route
          path="orders"
          element={<AdminOrders />}
        />

        <Route path="customers" element={<Customers />} />

        <Route path="categories" element={<Categories />} />

        <Route path="reviews" element={<Reviews />} />

        <Route path="analytics" element={<Analytics />} />

        <Route path="coupons" element={<Coupons />} />

        <Route path="inventory" element={<Inventory />} />

        <Route path="banners" element={<BannerManagement />} />

        <Route path="settings" element={<Settings />} />

        <Route path="profile" element={<AdminProfile />} />

        <Route path="notifications" element={<Notifications />} />

        <Route path="sales-report" element={<SalesReport />} />

        <Route path="refunds" element={<RefundManagement />} />

        <Route
          path="admin-management"
          element={<AdminManagement />}
        />


      </Route>





      {/* 404 */}

      <Route
        path="*"
        element={<NotFound />}
      />


    </Routes>

  );

}



export default App;