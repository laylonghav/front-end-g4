import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/users/HomePage";
import AboutPage from "./pages/users//AboutPage";
import ProfilePage from "./pages/users//ProfilePage";
import NotFoundPage from "./pages/users//NotFoundPage";
import MasterLayout from "./components/layouts/MasterLayout";
import ProductDetailPage from "./pages/users//ProductDetailPage";
import AuthLayout from "./components/layouts/Authlayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
// import MainLayout from "./components/layouts/MainLayout001";
import DashboardPage from "./pages/admins/DashboardPage";
import UserPage from "./pages/admins/UserPage";
import SupplierPage from "./pages/admins/SupplierPage";
import POSPage from "./pages/admins/POSPage";
import MainLayout from "./components/layouts/MainLayout";
import BrandPage from "./pages/admins/BrandPage";
import CategoryPage from "./pages/admins/CategoryPage";
import ProductPage from "./pages/admins/ProductPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MasterLayout />}>
            <Route index element={<HomePage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route> */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="supplier" element={<SupplierPage />} />
            <Route path="pos" element={<POSPage />} />
            <Route path="brand" element={<BrandPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="product" element={<ProductPage />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
