import React, { useState, useEffect } from 'react'
import { getAllCategories } from '../services/getRequests';
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

export default function NavbarMenu() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);



    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <>
            <Navbar.Toggle aria-controls="avon-mobile-menu" className='d-flex d-lg-none'/>
            <Navbar
                className="navbar-expand-lg ecommerce-navbar is-sticky"
                id="navbar"
            >
                <div className="container mt-3">
                    <Navbar.Collapse>
                        <ul className='d-flex list-unstyled justify-content-between w-100'>
                            {categories.map((category, index) => {
                                console.log(category);
                                return (
                                    <Nav key={index} className="nav-item py-3 dropdown dropdown-hover dropdown-mega-full responsive_catalog_none">
                                        <Link
                                            to="/ana-sehife"
                                            className="nav-link dropdown-toggle"
                                            data-key="t-catalog"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {category.name}
                                        </Link>

                                        <div className="dropdown-menu p-0 p-4" style={{ width: '75%' }}>
                                            <Row className="g-0 g-lg-4">
                                                <Col
                                                    lg={10}
                                                    className="d-none d-lg-block responsive_catalog_none"
                                                >
                                                    <Row className="g-0 g-lg-8">
                                                        <Col lg={6}>
                                                            <h6>Kateqoriyalar</h6>
                                                            <ul className="dropdown-menu-list list-unstyled mb-0 py-3">
                                                                {category.subCategories.map(
                                                                    (subcategory, subIndex) => (
                                                                        <Nav className="nav-item" key={subIndex}>
                                                                            <Nav.Link
                                                                                to={`/kateqoriyalar/${subcategory.name}`}
                                                                                className="nav-link text-black"
                                                                                data-key={`t-${subcategory.name}`}
                                                                            >
                                                                                {subcategory.name}
                                                                            </Nav.Link>
                                                                        </Nav>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <h6>Brendlər</h6>
                                                            <ul className="dropdown-menu-list list-unstyled mb-0 py-3">
                                                                {category.brands.map(
                                                                    (brand, subIndex) => (
                                                                        <li className="nav-item" key={subIndex}>
                                                                            <Link
                                                                                to={`/kateqoriyalar/${brand.name}`}
                                                                                className="nav-link text-black"
                                                                                data-key={`t-${brand.name}`}
                                                                            >
                                                                                {brand.name}
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Nav>
                                )
                            })}
                        </ul>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    )
}
