import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { CommonService } from "../../../Components/CommonService";
import HotDeals from "../../../Components/HotDeals";
import EmailClothe from "../../../Pages/Catalog/EmailClothe";
import { ProductGrid, ProductSelector } from '../../../Components/ProductSilde';
import ListProductData from "../../../Components/ListProductData";
import { filterProduct } from "../../../Common/data";

const Listnoslider = () => {

    const [listnoslider, setListnoslider] = useState(filterProduct);

    //ratting
    const handleRatting = (event) => {
        setListnoslider(filterProduct?.filter((rat) => rat.ratting.toString().startsWith(event.value)));
    }
    //diccount
    const handleDicount = (event) => {
        setListnoslider(filterProduct?.filter((dicCount) => dicCount.dic === event.value))
    }
    //category
    const handleCategory = (event) => {
        setListnoslider(filterProduct?.filter((category) => category.products === event.value))
    }
    return (
        <React.Fragment>
            <ProductGrid title="Product List No Sidebar" />
            <section className="section">
                <Container>
                    <div className="ecommerce-product gap-4">
                        <div className="flex-grow-1">
                            <ProductSelector
                                handleratting={(e) => handleRatting(e)}
                                handledicount={(e) => handleDicount(e)}
                                handlecategory={(e) => handleCategory(e)}
                            />
                            <ListProductData listnoslider={listnoslider} />
                        </div>
                    </div>
                </Container>
            </section>
            <HotDeals />
            <EmailClothe />
            <CommonService />
        </React.Fragment>
    );
}

export default Listnoslider;