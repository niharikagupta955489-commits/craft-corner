import { Routes, Route } from "react-router-dom";

import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLayoutV2 from "./components/admin-v2/AdminLayout";
import AdminRoute from "./components/AdminRoute";



// ==========================
// USER PAGES
// ==========================

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
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";



// ==========================
// ADMIN LOGIN
// ==========================

import AdminLogin from "./pages/admin/AdminLogin";



// ==========================
// OLD ADMIN
// ==========================

import AdminDashboard from "./pages/admin/Dashboard";
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
import HomeSettings from "./pages/admin/HomeSettings";



// ==========================
// ADMIN V2
// ==========================

import AdminV2Dashboard from "./pages/admin-v2/Dashboard";
import ProductsV2 from "./pages/admin-v2/Products";
import Orders from "./pages/admin-v2/Orders";
import CustomersV2 from "./pages/admin-v2/Customers";
import CategoriesV2 from "./pages/admin-v2/Categories";
import AddProductV2 from "./pages/admin-v2/AddProduct";
import AdminManagementV2 from "./pages/admin-v2/AdminManagement";
import SettingsV2 from "./pages/admin-v2/Settings";
import OrderDetails from "./pages/admin-v2/OrderDetails";
import EditProductV2 from "./pages/admin-v2/EditProduct";
import AdminProfileV2 from "./pages/admin-v2/AdminProfile";
import AnalyticsV2 from "./pages/admin-v2/Analytics";



function App() {

  return (

    <Routes>

      {/* =========================
          USER ROUTES
      ========================== */}

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

        <Route path="marketplace" element={<Marketplace />} />

      </Route>



      {/* =========================
          ADMIN LOGIN
      ========================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />



      {/* =========================
          OLD ADMIN
      ========================== */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >

        <Route index element={<AdminDashboard />} />

        <Route path="dashboard" element={<AdminDashboard />} />

        <Route path="products" element={<Products />} />

        <Route path="add-product" element={<AddProduct />} />

        <Route path="edit-product/:id" element={<EditProduct />} />

        <Route path="orders" element={<AdminOrders />} />

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

        <Route path="admin-management" element={<AdminManagement />} />

        <Route path="home-settings" element={<HomeSettings />} />
<Route path="orders" element={<Orders/>}/>

      </Route>

      {/* =========================
          ADMIN V2
      ========================== */}

      <Route
        path="/admin-v2"
        element={
          <AdminRoute>
            <AdminLayoutV2 />
          </AdminRoute>
        }
      >

        <Route
          index
          element={<AdminV2Dashboard />}
        />

        <Route
          path="dashboard"
          element={<AdminV2Dashboard />}
        />

        <Route
          path="products"
          element={<ProductsV2 />}
        />
<Route
path="products/edit/:id"
element={<EditProductV2 />}
/>

       <Route
  path="AddProduct"
  element={<AddProductV2 />}
/>

        <Route
          path="orders"
          element={<Orders />}
        />
<Route
path="analytics"
element={<AnalyticsV2/>}
/>
<Route
path="orders/:id"
element={<OrderDetails/>}
/>
<Route
path="profile"
element={<AdminProfileV2/>}
/>

        <Route
          path="customers"
          element={<CustomersV2 />}
        />

        <Route
          path="categories"
          element={<CategoriesV2 />}
        />

        <Route
          path="admin-management"
          element={<AdminManagementV2 />}
        />

        <Route
          path="settings"
          element={<SettingsV2 />}
        />

      </Route>



      {/* =========================
          NOT FOUND
      ========================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );

}

export default App;

