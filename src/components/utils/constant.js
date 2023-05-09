export const ACCESS_TOKEN = "098hsban23q";

export const routesForBreadcrumbs = [
  {
    path: "/dashboard/app",
    breadcrumb: "Dashboard",
  },
  {
    path: "/dashboard/projects",
    breadcrumb: "All Projects",
  },
  {
    // path: "/dashboard/projects/:id?search=&page=0&status=all&searchedUser=-1",
    path: "/dashboard/projects/:id",
    breadcrumb: "Project Requirement",
  },
  {
    path: "/dashboard/user",
    breadcrumb: "Users",
  },
  {
    path: "/dashboard/user/createUser",
    breadcrumb: "Create User",
  },
  {
    path: "/dashboard/charter",
    breadcrumb: "Project Charter",
  },
  {
    path: "/dashboard/questions",
    breadcrumb: "Questions",
  },
  {
    path: "/dashboard/questions/add",
    breadcrumb: "Add Review Question",
  },
  {
    path: "/dashboard/charter",
    breadcrumb: "Project Charter",
  },
  {
    path: "/dashboard/charter/new",
    breadcrumb: "New Charter ",
  },
  {
    path: "/dashboard/charter",
    breadcrumb: "Project Charter",
  },
  {
    path: "/dashboard/charter/:id",
    breadcrumb: "Charter Details",
  },
  {
    path: "/dashboard/projects/:id/tickets/:id",
    breadcrumb: "Chat Thread",
  },
];

export const routesMapper = [
  "/dashboard/app",
  "/dashboard/projects",
  "/dashboard/projects/:id",
  "/dashboard/user/createUser",
  "/dashboard/user",
  "/dashboard/charter",
  "/dashboard/questions",
  "/dashboard/questions/add",
  "/dashboard/charter",
  "/dashboard/charter/new",
  "/dashboard/charter/:id",
  "/dashboard/projects/:id/tickets/:id",
];

export const overviewPath = "overview";
export const proposalPath = "proposal";
export const tablePath = "table";
export const scopePath = "scope";
export const clientSupport = "client-support";
export const vendorSupport = "vendor-support";
export const feedbackPath = "feedback";
export const commercialsPath = "commercials";
export const newTable = "newTab";
export const proformaInvoice = "proformaInvoice";
export const poTable = "poTable";
export const timeline = "timeline";
export const approval = "approval";
export const collection = "collection";
