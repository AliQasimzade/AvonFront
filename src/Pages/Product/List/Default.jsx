import React, { useState } from "react";
import { Container } from "react-bootstrap";

import { CommonProduct, DefauilOffer, Selectores } from "../../../Components/ProductSilde";
import Productfilter from "../Grid/ProductFilter";
import MyComponent from "./ReactTable";
import Deals from "../../../Pages/Catalog/deals";
import { CommonService } from "../../../Components/CommonService";
import { productData } from "../../../Common/data/ProductData";

const ListDefault = () => {
    const [select, setSelect] = useState(productData);

    const handleSlector = (event) => {
        setSelect(productData?.filter((select) => select.sortBy === event.value || event.value === "all"))
    }

    const searchProducts = (ele) => {
        let search = ele.target.value
        if (search) {
            search = search.toLowerCase();
            setSelect(productData?.filter((data) => data.productTitle.toLowerCase().includes(search)))
        } else {
            setSelect(productData);
        }
    }

    return (
        <React.Fragment>
            <section className="section pb-0 mt-4">
                <CommonProduct clg="4" cmd="6" />
            </section>
            <section className="section">
                <Container>
                    <div className="ecommerce-product gap-4">
                        <Productfilter name="sidebar small-sidebar flex-shrink-0" setSelect={setSelect} />
                        <div className="flex-grow-1">
                            <Selectores setSelect={(e) => handleSlector(e)} searchProducts={(e) => searchProducts(e)} />
                            <MyComponent select={select} />
                        </div>
                    </div>
                </Container>
            </section>
            <Deals />
            <DefauilOffer />
            <CommonService />
        </React.Fragment>
    )
}

export default ListDefault;