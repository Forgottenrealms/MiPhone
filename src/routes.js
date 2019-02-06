import { 
  DashBoard, 
  ProductQuery,
  ProductEdit, 
  ProductTables, 
  ProductDetails, 
  StaffManagement, 
  ProductAnalysis,
  UsersManagement, 
  UserEdit,
  OrderView,
  OrderEdit, 
  GuestbookEdit, 
  GuestbookView 
} from "./pages";

const routes = [
  {
    path: "/dashboard",
    title: "Dashboard",
    component: DashBoard,
    iconType: "home",
    isMenu: true,
    exact: false
  },
  // 商品
  {
    path: "/product/query",
    title: "商品查询",
    component: ProductQuery,
    iconType: "file-search",
    isSubMenu: true,
    exact: false
  },
  {
    path: "/product/tables",
    title: "商品总览",
    component: ProductTables,
    iconType: "database",
    isSubMenu: true,
    exact: false
  },
  {
    path: "/product/analysis",
    title: "数据分析",
    component: ProductAnalysis,
    iconType: "dashboard",
    isSubMenu: true,
    exact: false
  },
  {
    path: "/product/edit/:id",
    title: "商品编辑",
    component: ProductEdit,
    isSubMenu: true,
    exact: false
  },
  {
    path: "/product/details/:id",
    title: "商品详情",
    component: ProductDetails,
    exact: false
  },
  // 订单
  {
    path: "/order/view",
    title: "查看订单",
    iconType: "ordered-list",
    component: OrderView,
    isMenu: true,
    exact: false
  },
  {
    path: "/order/edit",
    title: "编辑订单",
    iconType: "ordered-list",
    component: OrderEdit,
    isMenu: false,
    exact: false
  },
  // 留言板
  {
    path: "/guestbook/view",
    title: "查看留言板",
    iconType: "message",
    component: GuestbookView,
    isMenu: true,
    exact: false
  },
  {
    path: "/guestbook/edit",
    title: "编辑留言板",
    iconType: "message",
    component: GuestbookEdit,
    isMenu: false,
    exact: false
  },
  // 用户
  {
    path: "/users/staff",
    title: "工作人员",
    iconType: "profile",
    component: StaffManagement,
    isMenu: true,
    exact: false
  },
  {
    path: "/users/management",
    title: "用户管理",
    iconType: "user",
    component: UsersManagement,
    isMenu: true,
    exact: false
  },
  {
    path: "/users/edit/:id",
    title: "编辑用户",
    iconType: "user",
    component: UserEdit,
    isMenu: false,
    exact: false
  },
];

export default routes;
