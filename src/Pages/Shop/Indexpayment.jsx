import React from "react";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import Payment from "./Payment";
import { BrandedProduct, Shoptopbar } from "../../Components/ShopTopBar";
import { CommonService } from "../../Components/CommonService";


const PaymentIndex = () => {
    document.title = "Shop  | RGAgency - React FrontEnd";

    return (
        <>
            <Shoptopbar title="Payment" page="Payment" />
            <Payment />
            <BrandedProduct title="Recently Viewed" />
            <EmailClothe />
            <CommonService />
        </>
    )

}

export default PaymentIndex;