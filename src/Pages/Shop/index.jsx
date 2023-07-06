import React from "react";
import { Shoptopbar } from "../../Components/ShopTopBar";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import Selectaddress from "./Selectaddress";

const Shopindex = () => {
    document.title = "Shop | RGAgency - React FrontEnd";
    return (
        <>
            <Shoptopbar title="Shipping Address" page="Address" />
            <Selectaddress />
            <EmailClothe />
             
        </>
    )

}

export default Shopindex;