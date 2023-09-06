import { useContext } from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// components
import Root from "./pages/Root";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import MyBlogs from "./pages/MyBlogs";
import CreateBlogs from "./pages/CreateBlogs";
import { DataContext } from "./context/DataProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";

const PrivateRoute = () => {
  const { authenticated } = useContext(DataContext);

  return authenticated ? (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          { path: "blogs", element: <Blogs /> },
          { path: "my-blogs", element: <MyBlogs /> },
          { path: "create-blogs", element: <CreateBlogs /> },
          { path: "update-blog/:id", element: <CreateBlogs /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
