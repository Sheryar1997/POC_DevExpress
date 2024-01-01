import Dashboard from "../Pages/Dashboard/Dashboard";
import DevExtreme from "../Pages/DevExtreme/DevExtreme";
import DevExtremeLine from "../Pages/DevExtremeLine/DevExtremeLine";
import DevExtremeDataGrid from "../Pages/DevExtremeDataGrid/DevExtremeDataGrid";
import DynamicPie from "../Pages/DynamicPie/DynamicPie";
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
    title: "Combo Dashboard",
  },
  {
    path: "#",
    title: "Charts",
    icon: "/images/cells.png",
    items: [ // Nested items for Charts dropdown
      {
        path: "/bar",
        icon: "/images/consignee_icon.png",
        title: "Bar chart",
      },
      {
        path: "/line",
        icon: "/images/dc_icon.png",
        title: "Line chart",
      },
      {
        path: "/pie",
        icon: "/images/enquiry_icon.png",
        title: "Pie chart",
      },
      {
        path: "/stack",
        icon: "/images/dc_icon.png",
        title: "Stacked Bar chart",
      },
      {
        path: "/scatter",
        icon: "/images/dc_icon.png",
        title: "Scatter chart",
      }
    ]
  },
  {
    path: "/data-grid",
    icon: "/images/cells.png",
    title: "Data Grid",
  }
];
