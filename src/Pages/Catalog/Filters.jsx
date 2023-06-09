import React, { useEffect, useState } from "react";
import Nouislider from "nouislider-react";

import { Collapse, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { filterProduct } from "../../Common/data";

import { useSelector } from "react-redux";
const Filters = ({ name }) => {
    let newList = [];
    const [mincost, setMincost] = useState(0);
    const [maxcost, setMaxcost] = useState(2000);

    const subs = useSelector(state => state.persistedReducer.Subcategories)
    console.log(subs);
    const [categories, setCategories] = useState([])
    //Collapse
    //colors
    const [open, setOpen] = useState(false);
    //sizes
    const [size, setSize] = useState(false);
    //brands
    const [brands, setBrands] = useState(false);
    //discount
    const [discount, setDiscount] = useState(false);
    //Rating
    const [rating, setRating] = useState(false);



    return (
        <>
            <div className={`${name}`}>
                <Card className="overflow-hidden">
                    <Card.Header>
                        <div className="d-flex mb-3">
                            <div className="flex-grow-1">
                                <h5 className="fs-16">Filterlə</h5>
                            </div>
                            <div className="flex-shrink-0">
                                <Link to="#" className="text-decoration-underline" id="clearall">Təmizlə</Link>
                            </div>
                        </div>
                        <div className="search-box">
                            <Form.Control className="" id="searchProductList" autoComplete="off" placeholder="Məhsul axtar..." />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                    </Card.Header>
                    <div className="accordion accordion-flush filter-accordion">
                        <Card.Body className="border-bottom">
                            <div>
                                <p className="text-muted text-uppercase fs-12 fw-medium mb-3">Kateqoriyalar</p>
                                <ul className="list-unstyled mb-0 filter-list">
                                    {
                                       subs.length > 0 &&  subs.map((cat) => {
                                            console.log(cat);
                                            return (
                                                <li key={cat.id}>
                                                    <Link to="#" className="d-flex py-1 align-items-center" onClick={() => handleProduct(`${cat.name}`)}>
                                                        <div className="flex-grow-1">
                                                            <h5 className="fs-13 mb-0 listname">{cat.name}</h5>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <span className="badge bg-light text-muted">{cat.productSubCategories.length}</span>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </Card.Body>

                        <Card.Body className="border-bottom">
                            <p className="text-muted text-uppercase fs-12 fw-medium mb-4">Qiymət</p>
                            <Nouislider
                                range={{ min: 0, max: 10000 }}
                                start={[mincost, maxcost]}
                                connect
                                data-slider-color="info"
                                id="product-price-range"
                            />
                            <div className="formCost d-flex gap-2 align-items-center mt-3">
                                <Form.Control className="form-control-sm" id="MinCost" value={`₼ ${mincost}`} onChange={(e) => setMincost(e.target.value)} />
                                <span className="fw-semibold text-muted">to</span>
                                <Form.Control className=" form-control-sm" type="text" id="maxCost" value={`₼ ${maxcost}`} onChange={(e) => setMaxcost(e.target.value)} />
                            </div>

                        </Card.Body>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingDiscount">
                                <Button
                                    onClick={() => setDiscount(!discount)}
                                    aria-controls="flush-collapseDiscount"
                                    aria-expanded={discount}
                                    className="accordion-button bg-transparent shadow-none"
                                >
                                    <span className="text-muted text-uppercase fs-12 fw-medium">Discount</span>
                                    <span className="badge bg-success rounded-pill align-middle ms-1 filter-badge"></span>
                                </Button>
                            </h2>
                            <Collapse in={discount}>
                                <div id="flush-collapseDiscount">
                                    <div className="accordion-collapse collapse show" aria-labelledby="flush-headingDiscount">
                                        <div className="accordion-body text-body pt-1">
                                            <div className="d-flex flex-column gap-2 filter-check" id="discount-filter">
                                                <div className="form-check">
                                                    <Form.Check type="checkbox" value="50" id="productdiscountRadio6" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio6">50% or more</Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Check type="checkbox" value="40" id="productdiscountRadio5" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio5">40% or more</Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Check type="checkbox" value="30" id="productdiscountRadio4" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio4">
                                                        30% or more
                                                    </Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Check type="checkbox" value="20" id="productdiscountRadio3" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio3">
                                                        20% or more
                                                    </Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Check type="checkbox" value="10" id="productdiscountRadio2" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio2">
                                                        10% or more
                                                    </Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Check type="checkbox" value="0" id="productdiscountRadio1" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio1">
                                                        Less than 10%
                                                    </Form.Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                        </div>

                        <Button
                            onClick={() => setRating(!rating)}
                            aria-controls="flush-collapseRating"
                            aria-expanded={rating}
                            className="accordion-button bg-transparent shadow-none"
                        >
                            <span className="text-muted text-uppercase fs-12 fw-medium">Rating</span>
                            <span className="badge bg-success rounded-pill align-middle ms-1 filter-badge"></span>
                        </Button>
                        <Collapse in={rating}>
                            <div id="flush-collapseRating">
                                <div className="accordion-collapse collapse show" aria-labelledby="flush-headingRating">
                                    <div className="accordion-body text-body">
                                        <div className="d-flex flex-column gap-2 filter-check" id="rating-filter">
                                            <div className="form-check">
                                                <Form.Check type="checkbox" value="4" id="productratingRadio4" onClick={() => hanleRat('4')} />
                                                <Form.Label className="form-check-label" htmlFor="productratingRadio4">
                                                    <span className="text-muted">
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star"></i>
                                                    </span> 4 Above
                                                </Form.Label>
                                            </div>
                                            <div className="form-check">
                                                <Form.Check type="checkbox" value="3" id="productratingRadio3" onClick={() => hanleRat('3')} />
                                                <Form.Label className="form-check-label" htmlFor="productratingRadio3">
                                                    <span className="text-muted">
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star"></i>
                                                        <i className="mdi mdi-star"></i>
                                                    </span> 3 Above
                                                </Form.Label>
                                            </div>
                                            <div className="form-check">
                                                <Form.Check type="checkbox" value="2" id="productratingRadio2" onClick={() => hanleRat('2')} />
                                                <Form.Label className="form-check-label" htmlFor="productratingRadio2">
                                                    <span className="text-muted">
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star"></i>
                                                        <i className="mdi mdi-star"></i>
                                                        <i className="mdi mdi-star"></i>
                                                    </span> 2 Above
                                                </Form.Label>
                                            </div>
                                            <div className="form-check">
                                                <Form.Check type="checkbox" value="1" id="productratingRadio1" onClick={() => hanleRat('1')} />
                                                <Form.Label className="form-check-label" htmlFor="productratingRadio1">
                                                    <span className="text-muted">
                                                        <i className="mdi mdi-star text-warning"></i>
                                                        <i className="mdi mdi-star"></i>
                                                        <i className="mdi mdi-star"></i>
                                                        <i className="mdi mdi-star"></i>
                                                        <i className="mdi mdi-star"></i>
                                                    </span> 1
                                                </Form.Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </Card>
            </div>
        </ >
    )
};

export default Filters;