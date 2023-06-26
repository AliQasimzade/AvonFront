import React, { useEffect, useState } from 'react';
import Nouislider from "nouislider-react";
import { Collapse, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { product } from '../../../Common/data';

const Productfilter = ({ name, setSelect }) => {

    const [mincost, setMincost] = useState(0);
    const [maxcost, setMaxcost] = useState(2000);

    //Collapse
    let newArray = [];
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

    const handleProduct = (value) => {
        setSelect(product?.filter((product) => product.products === value))
    }

    const handleColor = (value) => {
        product?.filter((item) => {
            return item?.color?.filter((color) => {
                if (color === value) {
                    newArray.push(item)
                    setSelect(newArray);
                }
                return item;
            })
        })
    }

    const handleSize = (event) => {
        product?.filter((item) => {
            return item.size?.filter((size) => {
                if (size === event.value.toUpperCase()) {
                    newArray.push(item)
                    setSelect(newArray)
                }
                return item;
            })
        })
    }

    const hanlerat = (value) => {
        setSelect(product?.filter((rat) => rat.ratting.toString().startsWith(value)))
    }
    const handleDic = (event) => {
        setSelect(product?.filter((discount) => discount.dic === event.value))
    }
    const onUpdate = (value) => {
        setMincost(value[0]);
        setMaxcost(value[1]);
    }
    useEffect(() => {
        onUpdate([mincost, maxcost]);
    }, [mincost, maxcost]);

    return (
        <>
            <div className={`${name}`}>
                <Card className="overflow-hidden">
                    <Card.Header>
                        <div className="d-flex mb-3">
                            <div className="flex-grow-1">
                                <h5 className="fs-16">Filters</h5>
                            </div>
                            <div className="flex-shrink-0">
                                <Link to="#" className="text-decoration-underline" id="clearall">Clear All</Link>
                            </div>
                        </div>
                        <div className="search-box">
                            <Form.Control type="text" id="searchProductList" autoComplete="off" placeholder="Məhsul axtarın..." />
                            <i className="ri-search-line search-icon"></i>
                        </div>
                    </Card.Header>
                    <div className="accordion accordion-flush filter-accordion">
                        <Card.Body className="border-bottom">
                            <div>
                                <p className="text-muted text-uppercase fs-12 fw-medium mb-3">Products</p>
                                <ul className="list-unstyled mb-0 filter-list">
                                    <li>
                                        <Link to="#" className="d-flex py-1 align-items-center" onClick={() => handleProduct("Grocery")}>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-13 mb-0 listname">Grocery</h5>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-flex py-1 align-items-center" onClick={() => handleProduct("Fashion")}>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-13 mb-0 listname">Fashion</h5>
                                            </div>
                                            <div className="flex-shrink-0 ms-2">
                                                <span className="badge bg-light text-muted">5</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-flex py-1 align-items-center" onClick={() => handleProduct("Watches")}>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-13 mb-0 listname">Watches</h5>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-flex py-1 align-items-center" onClick={() => handleProduct("Electronics")}>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-13 mb-0 listname">Electronics</h5>
                                            </div>
                                            <div className="flex-shrink-0 ms-2">
                                                <span className="badge bg-light text-muted">5</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-flex py-1 align-items-center" onClick={() => handleProduct("Furniture")}>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-13 mb-0 listname">Furniture</h5>
                                            </div>
                                            <div className="flex-shrink-0 ms-2">
                                                <span className="badge bg-light text-muted">6</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-flex py-1 align-items-center" onClick={() => handleProduct("Automotive")}>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-13 mb-0 listname">Automotive Accessories</h5>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="d-flex py-1 align-items-center" onClick={() => handleProduct("Appliances")}>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-13 mb-0 listname">Appliances</h5>
                                            </div>
                                            <div className="flex-shrink-0 ms-2">
                                                <span className="badge bg-light text-muted">7</span>
                                            </div>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="#" className="d-flex py-1 align-items-center" onClick={() => handleProduct("Kids")}>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-13 mb-0 listname">Kids</h5>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Card.Body>

                        <Card.Body className="border-bottom">
                            <p className="text-muted text-uppercase fs-12 fw-medium mb-4">Qiyməti</p>
                            <Nouislider
                                range={{ min: 0, max: 2000 }}
                                start={[mincost, maxcost]}
                                connect
                                onSlide={onUpdate}
                                data-slider-color="info"
                                id="product-price-range"
                            />
                            <div className="formCost d-flex gap-2 align-items-center mt-3">
                                <Form.Control className="form-control-sm" id="MinCost" value={`${mincost} ₼`} onChange={(e) => setMincost(e.target.value)} />
                                <span className="fw-semibold text-muted">-</span>
                                <Form.Control className=" form-control-sm" type="text" id="maxCost" value={`${maxcost} ₼`} onChange={(e) => setMaxcost(e.target.value)} />
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
                                    <span className="text-muted text-uppercase fs-12 fw-medium">Endirimi</span>
                                    <span className="badge bg-success rounded-pill align-middle ms-1 filter-badge"></span>
                                </Button>
                            </h2>
                            <Collapse in={discount}>
                                <div id="flush-collapseDiscount">
                                    <div className="accordion-collapse collapse show" aria-labelledby="flush-headingDiscount">
                                        <div className="accordion-body text-body pt-1">
                                            <div className="d-flex flex-column gap-2 filter-check" id="discount-filter">
                                                <div className="form-check">
                                                    <Form.Control className="form-check-input" type="checkbox" value="50" id="productdiscountRadio6" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio6">50% və ya daha çox</Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Control className="form-check-input" type="checkbox" value="40" id="productdiscountRadio5" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio5">40% və ya daha çox</Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Control className="form-check-input" type="checkbox" value="30" id="productdiscountRadio4" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio4">
                                                        30% və ya daha çox
                                                    </Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Control className="form-check-input" type="checkbox" value="20" id="productdiscountRadio3" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio3">
                                                        20% və ya daha çox
                                                    </Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Control className="form-check-input" type="checkbox" value="10" id="productdiscountRadio2" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio2">
                                                        10% və ya daha çox
                                                    </Form.Label>
                                                </div>
                                                <div className="form-check">
                                                    <Form.Control className="form-check-input" type="checkbox" value="0" id="productdiscountRadio1" onClick={(e) => handleDic(e.target)} />
                                                    <Form.Label className="form-check-label" htmlFor="productdiscountRadio1">
                                                        10%-dən az
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
                                                <Form.Control className="form-check-input" type="checkbox" value="4" id="productratingRadio4" onClick={() => hanlerat('4')} />
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
                                                <Form.Control className="form-check-input" type="checkbox" value="3" id="productratingRadio3" onClick={() => hanlerat('3')} />
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
                                                <Form.Control className="form-check-input" type="checkbox" value="2" id="productratingRadio2" onClick={() => hanlerat('2')} />
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
                                                <Form.Control className="form-check-input" type="checkbox" value="1" id="productratingRadio1" onClick={() => hanlerat('1')} />
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
        </>
    )
}

export default Productfilter;