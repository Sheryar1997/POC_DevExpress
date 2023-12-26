import { adminRoutes } from "./Container/Admin/Routes/Routes";
import NotFound from "./Container/Pages/NotFound/NotFound";
import AdminLayout from "./Layouts/AdminLayout";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  const adminLayout = (
    <Route path={"/"} element={<AdminLayout />}>
      {adminRoutes.map((item) => (
        <Route key={item.path} path={item.path} element={item.component} />
      ))}
    </Route>
  );

  return (
    <BrowserRouter>
      <Routes>
        {adminLayout}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;