import Dashboard from "../Pages/Dashboard/Dashboard";
import DevExtreme from "../Pages/DevExtreme/DevExtreme";
import DevExtremeLine from "../Pages/DevExtremeLine/DevExtremeLine";
import DevExtremePie from "../Pages/DevExtremePie/DevExtremePie";

export const adminRoutes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/bar",
    component: <DevExtreme />,
  },
  {
    path: "/line",
    component: <DevExtremeLine />,
  },
  {
    path: "/pie",
    component: <DevExtremePie />,
  },
];


export const adminSideBarItems = [
  {
    path: "/",
    icon: "/images/dashboard_icon.png",
    title: "Dashboard - chart-js",
  },
  {
    path: "/bar",
    icon: "/images/consignee_icon.png",
    title: "Dev Extreme - Bar chart",
  },
  {
    path: "/line",
    icon: "/images/dc_icon.png",
    title: "Dev Extreme - Line chart",
  },
  {
    path: "/pie",
    icon: "/images/enquiry_icon.png",
    title: "Dev Extreme - Pie chart",
  },
];