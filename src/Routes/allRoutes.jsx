import { Navigate } from "react-router-dom";

//dashbord
import Home from "../Pages/Home";

//Catalog
import Catalog from "../Pages/Catalog";
//shop
import ShopIndex from "../Pages/Shop";
import Trackorder from "../Pages/Shop/Trackorder";
import Review from "../Pages/Shop/Review";
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
import Logout from "../Pages/User/Logout";
import Error404 from "../Pages/User/Error404";
import Error500 from "../Pages/User/Error500";
import Comingsoon from "../Pages/User/Comingsoon";

//../pages / Email
import Blackfriday from "../Pages/Product/Email Product/Blackfriday";
import Flashsale from "../Pages/Product/Email Product/Flashsale";
import Ordersuccess from "../Pages/Product/Email Product/Ordersuccess";
import Ordersuccess2 from "../Pages/Product/Email Product/Ordersuccess2";

//Productdetails
import Productdetails from "../Pages/Product/Productdetails";

//categories
import Categories from "../Pages/Product/Categories";

//about
import About from "../Pages/Product/About";

//Purchase Guide
import Purchaseguide from "../Pages/Product/Purchaseguide";

//Terms of Conditions
import Termsconditions from "../Pages/Product/Termsconditions";

//Privacy Policy
import Privacypolicy from "../Pages/Product/Privacypolicy";

//Storelocator
import Storelocator from "../Pages/Product/Storelocator";

//FAQ
import FAQ from "../Pages/Product/FAQ";

//Invoice
import Invoice from "../Pages/Product/Invoice";

//elaqe
import ContactUs from "../Pages/ContactUs/Contact";
//
import NotFound from "../Pages/NotFound/NotFound";
import SubCatProduct from "../Pages/Product/SubCatProduct";
import ReferalCodePage from "../Pages/User/ReferalCodePage";

const authProtectedRoutes = [
  { path: "/ana-sehife", component: <Home /> },
  { path: "/catalog/clothing", component: <Catalog /> },

  { path: "/hesabim/unvanlarim", component: <ShopIndex /> },
  { path: "/shop/order", component: <Trackorder /> },
  { path: "/shop/review", component: <Review />, isLight: "light" },
  { path: "/shop/confirm", component: <Confirm /> },
  { path: "/shop/orderhistory", component: <Orderhistory /> },
  { path: "/shop/shopingcard", component: <Shopingcard /> },
  { path: "/resmilesdirme", component: <Checkout /> },
  { path: "/shop/wishList", component: <WishList /> },
  { path: "/products", component: <Defaultgrid />},

  { path: "/product-details/:skuId", component: <Productdetails /> },

  { path: "/kateqoriyalar/:slug", component: <Categories /> },
  { path: "/haqqimizda", component: <About /> },
  { path: "/purchase-guide", component: <Purchaseguide /> },
  { path: "/terms-conditions", component: <Termsconditions /> },
  { path: "/privacy-policy", component: <Privacypolicy /> },
  { path: "/store-locator", component: <Storelocator /> },
  { path: "/ecommerce-faq", component: <FAQ /> },
  { path: "/invoice", component: <Invoice /> },
  { path: "/elaqe", component: <ContactUs /> },

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
  { path: "/referal", component: <ReferalCodePage /> },

  { path: "/sifreni-sifirla", component: <Passwordreset /> },
  { path: "/sifreni-yarat", component: <Passwordcreate /> },
  { path: "/hesab-tesdiqi", component: <Successmsg /> },
  { path: "/cixis", component: <Logout /> },
  { path: "/xeta-404", component: <Error404 /> },
  { path: "/xeta-500", component: <Error500 /> },
   { path: "/coming-soon", component: <Comingsoon /> },

  { path: "/email-black-friday", component: <Blackfriday /> },
  { path: "/email-flash-sale", component: <Flashsale /> },
  { path: "/email-order-success", component: <Ordersuccess /> },
  { path: "/email-order-success-2", component: <Ordersuccess2 /> },
  { path: "*", component: <NotFound /> }
];

export { authProtectedRoutes, publicRoutes };
