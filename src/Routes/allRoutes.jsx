import { Navigate } from "react-router-dom";

//dashbord
import Home from "../Pages/Home";

//Catalog
import Catalog from "../Pages/Catalog";
//shop
import ShopIndex from "../Pages/Shop";
import Trackorder from "../Pages/Shop/Trackorder";
import Confirm from "../Pages/Shop/Confirm";
import Orderhistory from "../Pages/Shop/Orederhistory";
import Shopingcard from "../Pages/Shop/Shopingcard";
import Checkout from "../Pages/Shop/Checkout";
import WishList from "../Pages/Shop/WhishList";

//../pages /product / grid
import Defaultgrid from "../Pages/Product/Grid/Default";

//../pages /user
import MyAccount from "../Pages/User/MyAccount";
import SignUp from "../Pages/User/SignUp";
import Signin from "../Pages/User/SignIn";
import Passwordreset from "../Pages/User/Passwordreset";
import Passwordcreate from "../Pages/User/Passwordcreate";
import Successmsg from "../Pages/User/Successmsg";

//Productdetails
import Productdetails from "../Pages/Product/Productdetails";

//categories
import Categories from "../Pages/Product/Categories";

//about
import About from "../Pages/Product/About";

//Terms of Conditions
import Termsconditions from "../Pages/Product/Termsconditions";

//Privacy Policy
import Privacypolicy from "../Pages/Product/Privacypolicy";


//elaqe
import ContactUs from "../Pages/ContactUs/Contact";
//
import NotFound from "../Pages/NotFound/NotFound";
import News from "../Pages/News/News";
import NewsDetail from "../Pages/News/NewsDetail/NewsDetail";
import BalanceHistory from "../Pages/Shop/BalanceHistory";

const authProtectedRoutes = [
  { path: "/ana-sehife", component: <Home /> },
  { path: "/brendler/:slug", component: <Catalog /> },

  { path: "/hesabim/unvanlarim", component: <ShopIndex /> },
  { path: "/sifaris-izleme", component: <Trackorder /> },
  { path: "/sifarisiniz-tesdiqlendi", component: <Confirm /> },
  { path: "/hesabim/sifaris-tarixcesi", component: <Orderhistory /> },
  { path: "/hesabim/balans-tarixcesi", component: <BalanceHistory /> },
  { path: "sebet", component: <Shopingcard /> },
  { path: "/resmilesdirme", component: <Checkout /> },
  { path: "/istek-siyahisi", component: <WishList /> },
  { path: "/mehsullar", component: <Defaultgrid />},

  { path: "/mehsul-detallari/:slug", component: <Productdetails /> },

  { path: "/kateqoriyalar/:slug", component: <Categories /> },
  { path: "/kateqoriyalar/:slug/:slug", component: <Categories /> },
  { path: "/haqqimizda", component: <About /> },
  { path: "/terms-conditions", component: <Termsconditions /> },
  { path: "/privacy-policy", component: <Privacypolicy /> },
  { path: "/elaqe", component: <ContactUs /> },
  { path: "/xeberler", component: <News /> },
   { path: "/xeberler/:slug", component: <NewsDetail /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/ana-sehife" />,
  },
];

const publicRoutes = [
  { path: "/hesabim", component: <MyAccount /> },
  { path: "/giris", component: <Signin /> },
  { path: "/qeydiyyat", component: <SignUp /> },

  { path: "/sifreni-sifirla", component: <Passwordreset /> },
  { path: "/sifreni-yarat", component: <Passwordcreate /> },
  { path: "/hesab-tesdiqi", component: <Successmsg /> },
  { path: "*", component: <NotFound /> }
];

export { authProtectedRoutes, publicRoutes };
