import React, { useState, useEffect } from 'react'
import { getAllCategories, getAllBrands } from '../services/getRequests';
import { Link } from "react-router-dom";
import {
    Container,
    Dropdown,
    Button,
    Row,
    Col,
    Card,
    Image,
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";

export default function Navbar() {
    // kateqoriyalar
    const [categories, setCategories] = useState([]);
    const [brendler, setBrendler] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchDataBrendler();
    }, []);



    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchDataBrendler = async () => {
        try {
            const res = await getAllBrands();
            setBrendler(res);
        } catch (err) {
            console.error("error", err);
        }
    };



    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {categories.map((cat,ind)=>{
                                
                            })}


                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            );
            <li className="nav-item dropdown_responsive">
                <NavDropdown
                    data-key="t-catalog"
                    id="nav-dropdown-dark-example"
                    title={props.t("catalog")}
                >
                    <NavDropdown.Item href="#">
                        {categories.map((category, index) => (
                            <Col lg={2} key={index}>
                                <ul className="dropdown-menu-list list-unstyled mb-0 py-3">
                                    <li>
                                        <p
                                            className="mb-2 text-uppercase fs-11 fw-medium text-muted menu-title"
                                            data-key={`t-${category.name}`}
                                        >
                                            {category.name}
                                        </p>
                                    </li>
                                    {category.subCategories.map(
                                        (subcategory, subIndex) => (
                                            <li className="nav-item" key={subIndex}>
                                                <Link
                                                    to={`/kateqoriyalar/${subcategory.name}`}
                                                    className="nav-link"
                                                    data-key={`t-${subcategory.name}`}
                                                >
                                                    {props.t(subcategory.name)}
                                                </Link>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </Col>
                        ))}
                    </NavDropdown.Item>
                </NavDropdown>
            </li>

            <li className="nav-item dropdown dropdown-hover dropdown-mega-full responsive_catalog_none">
                <Link
                    to="/"
                    className="nav-link dropdown-toggle"
                    data-key="t-catalog"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {props.t("catalog")}
                </Link>

                <div className="dropdown-menu p-0">
                    <Row className="g-0 g-lg-4">
                        <Col lg={2} className="d-none d-lg-block">
                            <Card
                                className="rounded-start rounded-0 border-0 h-100 mb-0 overflow-hidden"
                                style={{
                                    backgroundImage: `url(${img1})`,
                                    backgroundSize: "cover",
                                }}
                            >
                                <div className="bg-overlay bg-light bg-opacity-25"></div>
                                <Card.Body className="d-flex align-items-center justify-content-center">
                                    <div className="text-center">
                                        <Link className="btn btn-secondary btn-hover">
                                            <i className="ph-storefront align-middle me-1"></i>{" "}
                                            <span data-key="t-shop-now">
                                                {props.t("shop-now")}
                                            </span>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col
                            lg={10}
                            className="d-none d-lg-block responsive_catalog_none"
                        >
                            <Row className="g-0 g-lg-8">
                                {/* kateqoriyalar */}
                                {categories.map((category, index) => (
                                    <Col lg={2} key={index}>
                                        <ul className="dropdown-menu-list list-unstyled mb-0 py-3">
                                            <li>
                                                <p
                                                    className="mb-2 text-uppercase fs-11 fw-medium text-muted menu-title"
                                                    data-key={`t-${category.name}`}
                                                >
                                                    {category.name}
                                                </p>
                                            </li>
                                            {category.subCategories.map(
                                                (subcategory, subIndex) => (
                                                    <li className="nav-item" key={subIndex}>
                                                        <Link
                                                            to={`/kateqoriyalar/${subcategory.name}`}
                                                            className="nav-link"
                                                            data-key={`t-${subcategory.name}`}
                                                        >
                                                            {props.t(subcategory.name)}
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </Col>
                                ))}
                                {/* brendler */}
                                <Col lg={4} className="d-none d-lg-block">
                                    <div className="p-3">
                                        <p
                                            className="mb-3 text-uppercase fs-11 fw-medium text-muted"
                                            data-key="t-top-brands"
                                        >
                                            {props.t("top-brands")}
                                        </p>
                                        <Row className="g-2 flex-wrap">
                                            {brendler.map((brend) => (
                                                <Link
                                                    key={brend.id}
                                                    to={`/brendler/${brend.slug}`}
                                                    className="d-flex p-2 border border-dashed text-center rounded-3 w-auto m-1"
                                                >
                                                    {brend.name}
                                                </Link>
                                            ))}
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </li>
        </>
    )
}
