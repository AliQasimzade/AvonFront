import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, Button, Row, Col, Card, Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import AvonLogo from "../assets/images/Logo.svg";
import "./header.css"
import img1 from "../assets/images/users/user-dummy-img.jpg";
import { CardModal, SearchModal } from "../Components/MainModal";
import { withTranslation } from "react-i18next";
import withRouter from "../Components/withRouter";
import { useDispatch, useSelector } from "react-redux";
import { IoLogIn } from "react-icons/io5"
import { logoutUser } from "../slices/layouts/accont";
import { logoutToken, logoutUserId } from "../slices/layouts/user";
import { getAllBrands, getAllCategories } from "../services/getRequests";
import { getAllBaskets } from "../slices/layouts/basket";
import { getAllWisslist } from "../slices/layouts/wistliss";
import NavbarMenu from "./NavbarMenu";
const Header = (props) => {
  const userData = useSelector(state => state.persistedReducer.Accont.user);
  const basket = useSelector(state => state.persistedReducer.Basket.basket);
  const wishlistAll = useSelector(state => state.persistedReducer.Wisslist.wisslist)
  // kateqoriyalar
  const [categories, setCategories] = useState([])
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
    dispatch(getAllBaskets([]))
    dispatch(getAllWisslist([]))
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
        <Container className="d-flex flex-column">
          <Row className="w-100">
            <div className="col-4 d-flex align-items-center">
              <div className="hamburger_manu_icon">
                <i className="bi bi-list fs-20 " onClick={menu}></i>
              </div>
              <Navbar.Brand href="/" onClick={menu} className="d-none d-lg-block">
                <div className="logo-dark">
                  <Image src={AvonLogo} alt="" height="95" />
                </div>
              </Navbar.Brand>
              {/* <Button className="btn btn-soft-primary btn-icon d-lg-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list fs-20"></i>
                    </Button> */}
            </div>
            <div className="col-8">
              <Row>
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-end">
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

                    <div className="topbar-head-dropdown ms-1 header-item">
                      <Link to="/shop/wishList">
                        <Button type="button" className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle text-muted">
                          <i className="ph-heart-bold fs-18"></i>
                          <span className="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-danger">{wishlistAll.length}</span>
                        </Button>
                      </Link>
                    </div>

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

                            <Image className="rounded-circle header-profile-user" src={userData?.profileImage.includes('https') ? userData?.profileImage : img1} alt="Header Avatar" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu >
                            <Dropdown.Item href='/hesabim/sifaris-tarixcesi'><i className="bi bi-cart4 text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Sifariş tarixçəsi</span></Dropdown.Item>
                            <Dropdown.Item href='/sifaris-izleme'><i className="bi bi-truck text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Sifarişini izlə</span></Dropdown.Item>
                            <Dropdown.Item href="/hesabim"><i className="bi bi-speedometer2 text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Hesabım</span></Dropdown.Item>
                            <Dropdown.Item href='#'><i className="bi bi-coin text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Balans: <b>{userData.balance}₼</b></span></Dropdown.Item>
                            <Dropdown.Item href='/ana-sehife' onClick={logOut}><i className="bi bi-box-arrow-right text-muted fs-16 align-middle me-1"></i> <span className="align-middle" data-key="t-logout">Çıxış</span></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown> : <Link to={"/giris"}>< IoLogIn style={{ fontSize: "23px", color: "black" }} />
                          <span className="ms-2 text-black">Giris et</span>
                        </Link>
                      }

                    </div>
                  </div>
                </div>
                <div className="col-12 ">
                  <Navbar.Collapse className={isActive ? 'navbar_responsive' : ''} id="xMode">
                    <Nav as="ul" className="mx-lg-auto mb-2 w-100 mb-lg-0 navbar_responsive_flex  justify-content-end" id="navigation-menu">
                      <div className="d-flex d-lg-none w-100 align-items-center justify-content-between">
                        <li className="nav-item d-block d-lg-none">
                          <Link to="/" className="d-block p-3 h-auto text-center"> <Image src={AvonLogo} alt="" height="85" /></Link>
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
                        </NavDropdown>
                      </li>
                      <li className="nav-item" style={{ color: '#A530B0 !important' }}>
                        <Link onClick={menu} className="nav-link" to='/mehsullar' data-key="t-contact">{props.t('shop')}</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={menu} className="nav-link" to='/haqqimizda' data-key="t-contact">{props.t('about')}</Link>
                      </li>
                      <li className="nav-item">
                        <Link onClick={menu} className="nav-link" to='/elaqe' data-key="t-contact">{props.t('contact')}</Link>
                      </li>
                    </Nav>
                  </Navbar.Collapse>
                </div>
              </Row>
            </div>

          </Row>
          <Row>
            <NavbarMenu />
          </Row>
        </Container>
      </Navbar>
      <CardModal show={card} handleClose={handlecardClose} />
    </>
  )
};

export default memo(withRouter(withTranslation()(Header)));