import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/movies/CartPage";
import CheckoutPage from "../pages/movies/CheckoutPage";
import SingleMovie from "../pages/movies/SingleMovie";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/movies/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageMovies from "../pages/dashboard/manageMovies/ManageMovies";
import AddMovie from "../pages/dashboard/addMovie/AddMovie";
import UpdateMovie from "../pages/dashboard/EditMovie/UpdateMovie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <PrivateRoute><OrderPage /></PrivateRoute>
      },
      {
        path: "/about",
        element: <div>About</div>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/checkout",
        element: <PrivateRoute><CheckoutPage /></PrivateRoute>
      },
      {
        path: "/movies/:id",
        element: <SingleMovie />
      },
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: <AdminRoute>
      <DashboardLayout />
    </AdminRoute>,
    children: [
      {
        path: "",
        element: <AdminRoute><Dashboard/></AdminRoute>
      },
      {
        path: "add-new-movie",
        element: <AdminRoute><AddMovie/></AdminRoute>
      },
      {
        path: "edit-movie/:id",
        element: <AdminRoute><UpdateMovie/></AdminRoute>
      },
      {
        path: "manage-movies",
        element: <AdminRoute><ManageMovies/></AdminRoute>
      },
    ]
  }
]);

export default router;