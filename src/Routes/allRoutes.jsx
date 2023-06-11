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
import Verifyemail from "../Pages/User/Verifyemail";
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
import NotFound from "../Pages/NotFound/NotFound"
import SubCatProduct from "../Pages/Product/SubCatProduct";

const authProtectedRoutes = [
    { path: "/ana-sehife", component: <Home /> },
    //catalog
    { path: "/catalog/clothing", component: <Catalog /> },

    //shop
    { path: "/hesabim/unvanlarim", component: <ShopIndex /> },
    { path: "/shop/order", component: <Trackorder /> },
    { path: "/shop/review", component: <Review />, isLight: "light" },
    { path: "/shop/confirm", component: <Confirm /> },
    { path: "/shop/orderhistory", component: <Orderhistory /> },
    { path: "/shop/shopingcard", component: <Shopingcard /> },
    { path: "/resmilesdirme", component: <Checkout /> },
    { path: "/shop/wishList", component: <WishList /> },

    //pages
    //Product
    //grid
    { path: "/products", component: <Defaultgrid />},


    //Productdetails
    { path: "/product-details/:skuId", component: <Productdetails /> },

    //user
    //My Account
    { path: "/hesabim", component: <MyAccount /> },

    //categories
    { path: "/kateqoriyalar", component: <Categories /> },
    //about
    { path: "/haqqimizda", component: <About /> },
    //Purchase Guide
    { path: "/purchase-guide", component: <Purchaseguide /> },
    //Terms of Conditions
    { path: "/terms-conditions", component: <Termsconditions /> },
    //Privacy Policy
    { path: "/privacy-policy", component: <Privacypolicy /> },
    //Storelocator
    { path: "/store-locator", component: <Storelocator /> },
    //FAQ
    { path: "/ecommerce-faq", component: <FAQ /> },
    //Invoice
    { path: "/invoice", component: <Invoice /> },
    //elaqe us
    { path: "/elaqe", component: <ContactUs /> },


    // this route should be at the end of all other routes
    // eslint-disable-next-line react/display-name
    {
        path: "/",
        exact: true,
        component: <Navigate to="/ana-sehife" />,
    },
  
]

const publicRoutes = [
    //user
    //Signin
    { path: "/giris", component: <Signin /> },
    //SignUp
    { path: "/qeydiyyat", component: <SignUp /> },
    //Passwordreset
    { path: "/sifreni-sifirla", component: <Passwordreset /> },
    //Passwordcreate
    { path: "/sifreni-yarat", component: <Passwordcreate /> },
    //Successmsg
    { path: "/auth-success-msg-basic", component: <Successmsg /> },
    //Verifyemail
    { path: "/emaili-tesdiqle", component: <Verifyemail /> },
    //Logout
    { path: "/cixis", component: <Logout /> },
    //error 404
    { path: "/xeta-404", component: <Error404 /> },
    //error 500
    { path: "/xeta-500", component: <Error500 /> },
    //Comingsoon
    { path: "/coming-soon", component: <Comingsoon /> },

    { path: "/catalog/:name", component: <SubCatProduct/> },

    //email
    //Blackfriday
    { path: "/email-black-friday", component: <Blackfriday /> },
    //Flashsale
    { path: "/email-flash-sale", component: <Flashsale /> },
    //oreder success
    { path: "/email-order-success", component: <Ordersuccess /> },
    //Ordersuccess2
    { path: "/email-order-success-2", component: <Ordersuccess2 /> },
    { path: "*", component: <NotFound /> }

]

export { authProtectedRoutes, publicRoutes };