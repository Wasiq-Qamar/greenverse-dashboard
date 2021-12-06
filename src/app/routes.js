import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import Account from "./pages/Account";

const routes = [
  {
    id: "login_11",
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth",
  },
  {
    id: "homepage_11",
    path: "/",
    name: "Home",
    component: Home,
    layout: "/app",
    sidebar: true,
  },
  {
    id: "homepage_11",
    path: "/users",
    name: "User",
    component: User,
    layout: "/app",
    sidebar: true,
  },
  {
    id: "homepage_11",
    path: "/accounts",
    name: "Account",
    component: Account,
    layout: "/app",
    sidebar: true,
  },
];
export default routes;
