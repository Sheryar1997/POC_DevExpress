import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { adminSideBarItems } from "../Container/Admin/Routes/Routes";
import Header from "../Components/Header/Header";
import { useEffect } from "react";

const AdminLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Header sideBarItems={adminSideBarItems}>
        <Outlet />
      </Header>
    </div>
  );
};

export default AdminLayout;
