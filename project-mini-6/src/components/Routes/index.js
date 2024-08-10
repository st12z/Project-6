import Home from "../../pages/Home";
import LayoutDefault from "../layout/LayoutDefault";
import Login from "../../pages/Login";
import Logout from "../../pages/Logout";
import Register from "../../pages/Register";
import Search from "../../pages/Search";
import JobDetail from "../../pages/Job/JobDetail";
import Company from "../../pages/Company";
import CompanyDetail from "../../pages/CompanyDetail";
import PrivateRoute from "../../components/PrivateRoute";
import Manage from "../../pages/Manage";
import LayoutAdmin from "../layout/LayoutAdmin";
import InfoCompany from "../../pages/infoCompanyAdmin";
import { Navigate, Outlet } from "react-router";
import DashBoard from "../../pages/DashBoard";
import ManageJob from "../../pages/ManageJob";
import ViewJob from "../../pages/ManageJob/ViewJob";
import ManageCV from "../../pages/ManageCV";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/job/:id",
        element: <JobDetail />,
      },
      {
        path: "/company/:id",
        element: <CompanyDetail />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "/admin",
            element: <DashBoard />,
          },
          {
            path: "/infoCompany",
            element: <InfoCompany />,
          },
          {
            path: "/manage-job",
            element: <ManageJob />,
          },
          {
            path: "/job-detail/:id",
            element: <ViewJob />,
          },
          {
            path: "cv",
            element: <ManageCV />,
          }
        ],
      },
    ],
  },
];
