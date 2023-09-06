import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};

export default Root;
