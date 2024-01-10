import Home from "./components/home.js";
import About from "./components/about.js";
import OrderSuccess from "./components/ordersuccess.js";
import Cart from "./components/cart.js";
import Login from "./components/login.js";
import Registration from "./components/registration.js";
import ManagerRegistration from "./components/managerregistration.js";
import Users from "./components/users.js";
import Products from "./components/products.js";
import YourAccount from "./components/your_account.js";

const routes = [
    { 
    path: '/', 
    component: Home,
    },
    { 
    path: '/about', 
    component: About,
    },
    {
    path: '/cart',
    component: Cart,
    name: 'Cart',
    },
    {
      path: '/your_account/',
      component: YourAccount,
      name: 'YourAccount',

    },
    { 
    path: '/ordersuccess', 
    component: OrderSuccess,
    name: 'OrderSuccess',
    },
    {
    path: '/login',
    component: Login,
    name: 'Login',
    },
    {
      path: '/Registration',
      component: Registration,
      name: 'Registration',
    },
    {
      path: '/Manager_Registration',
      component: ManagerRegistration,
      name: 'ManagerRegistration',

    },
    {
      path: '/products/:id',
      component: Products,
      name: 'Products',
    },
    {
      path: '/users',
      component: Users,
      name: 'Users',
    }
];
const router = new VueRouter({
    routes,
  });
export default router;