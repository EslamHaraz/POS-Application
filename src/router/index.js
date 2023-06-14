import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import signUp from "../views/signUp.vue";
import login from "../views/login.vue";
import employeesComp from "../components/employees/employeesComp.vue"
import errorPageComp from "../components/Error/errorPageComp.vue"
import addEmployee from "../components/addEmployee/addEmployee.vue"
import DeleteEmloyee from "../components/Delete/DeleteEmloyee.vue"
import editEmployee from "../components/EditEmployee/editEmployee.vue"
import addCategories from "../components/Categories/addCategories.vue"
import Dashboard from "../components/Dashboard/Dashboard.vue"
import Categories from "../views/Categories.vue"
import Products from "../views/Products.vue"
import Clints from '../views/Clints.vue'
import NewOrder from '../views/NewOrder.vue'
import ordres from '../views/ordres.vue'
import editDetalis from '../views/editDetalis.vue'
import editProfile from '../views/editProfile.vue'
import settings from '../views/settings.vue'
import shipment from '../views/shipment.vue'
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: signUp,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: `/Dashboard`,
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: `/Employees`,
    name: "employeesComp",
    component: employeesComp,
  },
  {
    path: `/addEmployee`,
    name: "addEmployee",
    component: addEmployee,
  },
  {
    path: `/addCategories`,
    name: "addCategories",
    component: addCategories,
  },
  {
    path: `/DeleteEmloyee/Employee/:employeeId`,
    name: "DeleteEmloyee",
    component: DeleteEmloyee,
  },
  {
    path: `/Categories`,
    name: "Categories",
    component: Categories,
  },
  {
    path: `/Products`,
    name: "Products",
    component: Products,
  },
  {
    path: `/Clints`,
    name: "Clints",
    component: Clints,
  },
  {
    path: `/NewOrder`,
    name: "NewOrder",
    component: NewOrder,
  },
  {
    path: `/editDetalis/order/:orderId`,
    name: "editDetalis",
    component: editDetalis,
  },
  {
    path: `/ordres`,
    name: "ordres",
    component: ordres,
  },
  {
    path: `/editEmployee/Employee/:employeeId`,
    name: "editEmployee",
    component: editEmployee,
  },
  {
    path: `/editProfile`,
    name: "editProfile",
    component: editProfile,
  },
  {
    path: `/settings`,
    name: "settings",
    component: settings,
  },
  {
    path: `/Track/the/shipment`,
    name: "shipment",
    component: shipment,
  },
    // Stays Last
    {
      path: "/:catchAll(.*)",
      name: "errorPageComp",
      component: errorPageComp,
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
