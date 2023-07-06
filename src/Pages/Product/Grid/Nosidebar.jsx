import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductGrid, ProductSelector, ProductSide, Selectores } from '../../../Components/ProductSilde';
import EmailClothe from '../../../Pages/Catalog/EmailClothe';
import { product } from '../../../Common/data';

const Nosider = () => {
    const [select, setSelect] = useState(product);
    //select product
    const setCategories = (event) => {
        setSelect(product?.filter((Sort) => Sort.sortBy === event.value || event.value === 'all'));
    }
    //rating
    const handleRatting = (event) => {
        setSelect(product?.filter((rat) => rat.ratting.toString().startsWith(event.value)));
    }
    //diccount
    const handleDicount = (event) => {
        setSelect(product?.filter((dicCount) => dicCount.dic === event.value))
    }
    //category
    const handleCategory = (event) => {
        setSelect(product?.filter((category) => category.products === event.value))
    }
    //search product
    const searchProducts = (ele) => {
        let search = ele.target.value;
        if (search) {
            search = search.toLowerCase()
            setSelect(product.filter((data) => (data.title.toLowerCase().includes(search))));
        } else {
            setSelect(product);
        }
    };
    return (
        <>
            <ProductGrid title="Product Grid No Sidebar" />
            <section className='position-relative section'>
                <Container>
                    <div className='col-3-layout'>
                        <Row>
                            <ProductSelector
                                handleratting={(e) => handleRatting(e)}
                                handledicount={(e) => handleDicount(e)}
                                handlecategory={(e) => handleCategory(e)}
                            />
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <Selectores setSelect={(event) => setCategories(event)} searchProducts={(ele) => searchProducts(ele)} />
                                <ProductSide
                                    cxxl="3"
                                    fileter={select}
                                />
                            </Col>
                        </Row>

                    </div>
                </Container>
            </section>
            <EmailClothe />
             
        </>
    )
}

export default Nosider;