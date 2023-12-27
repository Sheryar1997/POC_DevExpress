import Dashboard from "../Pages/Dashboard/Dashboard";
import DevExtreme from "../Pages/DevExtreme/DevExtreme";
import DevExtremeLine from "../Pages/DevExtremeLine/DevExtremeLine";
import DevExtremeDataGrid from "../Pages/DevExtremeDataGrid/DevExtremeDataGrid";
import DynamicPie from "../Pages/DynamicPie/DynamicPie";
import DevExtremePie from "../Pages/DevExtremePie/DevExtremePie";
import DevExtremeStack from "../Pages/DevExtremeStackedBar/DevExtremeStack";
// import DevExtremeDataGrid from "../Pages/DevExtremeDataGrid/DevExtremeDataGrid";
import DevExtremeScatterChart from "../Pages/DevExtremeScatterChart/DevExtemeScatter";

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
    component: <DynamicPie />,
  },
  {
    path: "/data-grid",
    component: <DevExtremeDataGrid />,
  },
  {
    path: "/stack",
    component: <DevExtremeStack />,
  },
  {
    path: "/scatter",
    component: <DevExtremeScatterChart />,
  }
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
  {
    path: "/data-grid",
    icon: "/images/cells.png",
    title: "Dev Extreme - Data Grid",
  },
  {
    path: "/stack",
    icon: "/images/dc_icon.png",
    title: "Dev Extreme - Stacked Bar chart",
  },
  {
    path: "/scatter",
    icon: "/images/dc_icon.png",
    title: "Dev Extreme - Scatter chart",
  }
];