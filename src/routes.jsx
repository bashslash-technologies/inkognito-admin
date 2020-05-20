import { lazy } from "react";

const DashboardComponent = lazy(() => import("./pages/Dashboard"));
const ConsumerComponent = lazy(() => import("./pages/Consumer"));
const ManageCouriers = lazy(() => import("./pages/Couriers"));
const ManageVendors = lazy(() => import("./pages/Vendors"));

export default [
  { path: "/", exact: true, component: DashboardComponent },
  { path: "/customers", exact: true, component: ConsumerComponent },
  { path: "/couriers", exact: true, component: ManageCouriers },
  { path: "/vendors", exact: true, component: ManageVendors },
];
