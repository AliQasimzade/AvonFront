import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Button, Row, Col, Card, Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import axios from 'axios';
//img
import AvonLogo from "../assets/images/avonLogo.png";
import "./header.css"
import img1 from "../assets/images/ecommerce/img-1.jpg";
import { CardModal, SearchModal } from "../Components/MainModal";
import { withTranslation } from "react-i18next";
import withRouter from "../Components/withRouter";
import { useDispatch, useSelector } from "react-redux";
import { IoLogIn } from "react-icons/io5"
import { logoutUser } from "../slices/layouts/accont";
import { logoutToken, logoutUserId } from "../slices/layouts/user";
import { getAllBrands, getAllCategories } from "../services/getRequests";
const Header = (props) => {
    const userData = useSelector(state => state.persistedReducer.Accont.user[0]);
    const basket = useSelector(state => state.persistedReducer.Basket.basket);
    // kateqoriyalar
    const [categories, setCategories] = useState([])
    const [brendler, setBrendler] = useState([]);
    //search modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //card modal
    const [card, setCard] = useState(false);

    const handlecardClose = () => setCard(false);
    const handlecardShow = () => setCard(true);



    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(logoutUser())
        dispatch(logoutToken())
        dispatch(logoutUserId())
    }

    useEffect(() => {
        fetchCategories();
        fetchDataBrendler();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataBrendler = async () => {
        try {
            const res = await getAllBrands();
            setBrendler(res)
        } catch (err) {
            console.error('error', err)
        }
    }




    useEffect(() => {
        const pathname = props.router.location.pathname;
        var ul = document.getElementById("navigation-menu")
        let items = ul.getElementsByTagName("a")
        var matchingMenuItem = null;
        removeActivation(items);
        for (let i = 0; i < items.length; i++) {
            if (pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
    }, [props.router.location.pathname]);

    const removeActivation = (items) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const parent = item.parentElement;
            if (item) {
                item.classList.remove("active");
            }
            if (parent) {
                parent.classList.remove("active");
            }
        }
    };

    const activateParentDropdown = (item) => {
        item.classList.add("active");
        const parent = item.closest(".dropdown-menu")?.parentElement.firstChild;
        if (parent) {
            parent.classList.add("active");
            const parent2 = item.closest(".dropdown-menu")?.parentElement.closest(".submenu")?.previousElementSibling;
            if (parent2) {
                parent2.classList.add("active");
            }
        }
        return false;
    };

    const [isActive, setIsActive] = useState(false);
    const menu = () => {
        // 👇️ toggle isActive state on click
        setIsActive(current => !current);
    };
    return (
        <>
            <Navbar className="navbar-expand-lg ecommerce-navbar is-sticky" id="navbar">
                <Container >
                    <div className="hamburger_manu_icon">
                        <i className="bi bi-list fs-20 " onClick={menu}></i>
                    </div>
                    <Navbar.Brand href="/" onClick={menu} className="d-none d-lg-block">
                        <div className="logo-dark">
                            <Image src={AvonLogo} alt="" height="25" />
                        </div>
                    </Navbar.Brand>
                    {/* <Button className="btn btn-soft-primary btn-icon d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list fs-20"></i>
                    </Button> */}
                    <Navbar.Collapse className={isActive ? 'navbar_responsive' : ''} id="xMode">
                        <Nav as="ul" className="mx-lg-auto mb-2 mb-lg-0 navbar_responsive_flex " id="navigation-menu">
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <li className="nav-item d-block d-lg-none">
                                    <Link to="/" className="d-block p-3 h-auto text-center"> <Image src={AvonLogo} alt="" height="25" /></Link>
                                </li>
                                <li className="X_menu">
                                    <i className="bi bi-x-lg" onClick={menu}></i>
                                </li>
                            </div>
                            <li className="nav-item">
                                <Link onClick={menu} to="/" className="nav-link" data-key="t-home">{props.t('home')}</Link>
                            </li>



                            {/* hamburvger catalog menu */}
                            <li className="nav-item dropdown_responsive">
                                <NavDropdown
                                    data-key="t-catalog"
                                    id="nav-dropdown-dark-example"
                                    title={props.t('catalog')}

                                >
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        {categories.map((category, index) => (
                                            <Col lg={2} key={index}>
                                                <ul className="dropdown-menu-list list-unstyled mb-0 py-3">
                                                    <li>
                                                        <p className="mb-2 text-uppercase fs-11 fw-medium text-muted menu-title" data-key={`t-${category.name}`}>
                                                            {category.name}
                                                        </p>
                                                    </li>
                                                    {category.subCategories.map((subcategory, subIndex) => (
                                                        <li className="nav-item" key={subIndex}>
                                                            <Link to={`/catalog/${subcategory.name}`} className="nav-link" data-key={`t-${subcategory.name}`}>
                                                                {props.t(subcategory.name)}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Col>
                                        ))}
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.3">
                                        <div className="p-3">
                                            <p className="mb-3 text-uppercase fs-11 fw-medium text-muted" data-key="t-top-brands">{props.t("top-brands")}</p>
                                            <Row className="g-2">
                                                {brendler.map((brend) => (
                                                    <Col key={brend.id} lg={4}>
                                                        <Link title={brend.name} to={`/${brend}`} className="d-block p-2 border border-dashed text-center rounded-3">
                                                            <Image src={brend.image} alt={brend.name} className="avatar-sm" />
                                                        </Link>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </li>

                            <li className="nav-item dropdown dropdown-hover dropdown-mega-full responsive_catalog_none">
                                <Link to="/#" className="nav-link dropdown-toggle" data-key="t-catalog" role="button" data-bs-toggle="dropdown" aria-expanded="false">{props.t('catalog')}</Link>

                                <div className="dropdown-menu p-0">
                                    <Row className="g-0 g-lg-4">
                                        <Col lg={2} className="d-none d-lg-block">
                                            <Card className="rounded-start rounded-0 border-0 h-100 mb-0 overflow-hidden" style={{ backgroundImage: `url(${img1})`, backgroundSize: "cover" }}>
                                                <div className="bg-overlay bg-light bg-opacity-25"></div>
                                                <Card.Body className="d-flex align-items-center justify-content-center">
                                                    <div className="text-center">
                                                        <Link className="btn btn-secondary btn-hover"><i className="ph-storefront align-middle me-1"></i> <span data-key="t-shop-now">{props.t("shop-now")}</span></Link>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg={10} className="d-none d-lg-block responsive_catalog_none">
                                            <Row className="g-0 g-lg-4">
                                                {/* kateqoriyalar */}
                                                {categories.map((category, index) => (
                                                    <Col lg={2} key={index}>
                                                        <ul className="dropdown-menu-list list-unstyled mb-0 py-3">
                                                            <li>
                                                                <p className="mb-2 text-uppercase fs-11 fw-medium text-muted menu-title" data-key={`t-${category.name}`}>
                                                                    {category.name}
                                                                </p>
                                                            </li>
                                                            {category.subCategories.map((subcategory, subIndex) => (
                                                                <li className="nav-item" key={subIndex}>
                                                                    <Link to={`/catalog/${subcategory.name}`} className="nav-link" data-key={`t-${subcategory.name}`}>
                                                                        {props.t(subcategory.name)}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </Col>
                                                ))}
                                                {/* brendler */}
                                                <Col lg={2} className="d-none d-lg-block">
                                                    <div className="p-3">
                                                        <p className="mb-3 text-uppercase fs-11 fw-medium text-muted" data-key="t-top-brands">{props.t("top-brands")}</p>
                                                        <Row className="g-2">
                                                            {brendler.map((brend) => (
                                                                <Col key={brend.id} lg={4}>
                                                                    <Link title={brend.name} to={`/${brend}`} className="d-block p-2 border border-dashed text-center rounded-3">
                                                                        <Image src={brend.image} alt={brend.name} className="avatar-sm" />
                                                                    </Link>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link onClick={menu} className="nav-link" to='/products' data-key="t-contact">{props.t('shop')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={menu} className="nav-link" to='/about-us' data-key="t-contact">{props.t('about')}</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={menu} className="nav-link" to='/contact' data-key="t-contact">{props.t('contact')}</Link>
                            </li>
                        </Nav>
                    </Navbar.Collapse>

                    <div className="bg-overlay navbar-overlay" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent.show"></div>
                    <div className="d-flex align-items-center">
                        <Button type="button" className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle text-muted" data-bs-toggle="modal" data-bs-target="#searchModal" onClick={handleShow}>
                            <i className="bx bx-search fs-22"></i>
                        </Button>
                        <SearchModal show={show} handleClose={handleClose} />
                        <div className="topbar-head-dropdown ms-1 header-item">
                            <Button type="button" className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle text-muted" data-bs-toggle="offcanvas" data-bs-target="#ecommerceCart" aria-controls="ecommerceCart" onClick={handlecardShow}>
                                <i className="ph-shopping-cart fs-18"></i>
                                <span className="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-danger">{basket.length}</span>
                            </Button>
                        </div>
                        {/* <CardModal show={card} handleClose={handlecardClose} /> */}

                        <Dropdown className="topbar-head-dropdown ms-2 header-item dropdown-hover-end" align="start">
                            <Dropdown.Toggle className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle text-muted" bsPrefix="btn">
                                <i className="bi bi-sun align-middle fs-20"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu p-2 dropdown-menu-end" id="light-dark-mode">
                                <Dropdown.Item eventKey="light" onClick={() => props.handleMood("light")}><i className="bi bi-sun align-middle me-2"></i> Defualt (light mode)</Dropdown.Item>
                                <Dropdown.Item eventKey="dark" onClick={() => props.handleMood("dark")}><i className="bi bi-moon align-middle me-2"></i> Dark</Dropdown.Item>
                                <Dropdown.Item eventKey="light" onClick={() => props.handleMood("light")}><i className="bi bi-moon-stars align-middle me-2"></i> Auto (system defualt)</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <div className="dropdown header-item dropdown-hover-end">
                            {
                                userData?.email ? <Dropdown>
                                    <Dropdown.Toggle id="page-header-user-dropdown" bsPrefix="btn" className="btn btn-icon btn-topbar btn-link rounded-circle" as="a">

                                        <Image className="rounded-circle header-profile-user" src={userData?.profileImage} alt="Header Avatar" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu >
                                        <Dropdown.Item href='/shop/orderhistory'><i className="bi bi-cart4 text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Order History</span></Dropdown.Item>
                                        <Dropdown.Item href='/shop/order'><i className="bi bi-truck text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Track Orders</span></Dropdown.Item>
                                        <Dropdown.Item href="#/action-3"><i className="bi bi-speedometer2 text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Dashboard</span></Dropdown.Item>
                                        <Dropdown.Item href='/ecommerce-faq'><i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Help</span></Dropdown.Item>
                                        <Dropdown.Item href='/account'><i className="bi bi-coin text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Balance : <b>₼{userData.balance}</b></span></Dropdown.Item>
                                        <Dropdown.Item href='/account'><span className="badge bg-success-subtle text-success mt-1 float-end">New</span><i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Settings</span></Dropdown.Item>
                                        <Dropdown.Item href='/home' onClick={logOut}><i className="bi bi-box-arrow-right text-muted fs-16 align-middle me-1"></i> <span className="align-middle" data-key="t-logout">Logout</span></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> : <Link to={"/giris"}>< IoLogIn style={{ fontSize: "23px", color: "black" }} />
                                    <span className="ms-2 text-black">Giris et</span>
                                </Link>
                            }

                        </div>
                    </div>
                </Container>
            </Navbar>
            <CardModal show={card} handleClose={handlecardClose} />
        </>
    )
};

export default withRouter(withTranslation()(Header));