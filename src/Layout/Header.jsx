import React, { useEffect, useState, memo } from "react";
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
import AvonLogo from "../assets/images/Logo.svg";
import "./header.css";
import { CardModal, SearchModal } from "../Components/MainModal";
import { withTranslation } from "react-i18next";
import withRouter from "../Components/withRouter";
import { useDispatch, useSelector } from "react-redux";
import { IoLogIn } from "react-icons/io5";
import { logoutUser } from "../slices/layouts/accont";
import { logoutToken, logoutUserId } from "../slices/layouts/user";
import { getAllBaskets } from "../slices/layouts/basket";
import { getAllWisslist } from "../slices/layouts/wistliss";
import NavbarMenu from "./NavbarMenu";

const Header = (props) => {

  const userData = useSelector((state) => state.persistedReducer.Accont.user);
  const basket = useSelector((state) => state.persistedReducer.Basket.basket);
  const wishlistAll = useSelector(
    (state) => state.persistedReducer.Wisslist.wisslist
  );

  //search modal
  const [show, setShow] = useState(false);
  const [searchWord, setSearchWord] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //card modal
  const [card, setCard] = useState(false);

  const handlecardClose = () => setCard(false);
  const handlecardShow = () => setCard(true);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logoutUser());
    dispatch(logoutToken());
    dispatch(logoutUserId());
    dispatch(getAllBaskets([]));
    dispatch(getAllWisslist([]));
  };


  useEffect(() => {
    const pathname = props.router.location.pathname;
    var ul = document.getElementById("navigation-menu");
    let items = ul.getElementsByTagName("a");
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
      const parent2 = item
        .closest(".dropdown-menu")
        ?.parentElement.closest(".submenu")?.previousElementSibling;
      if (parent2) {
        parent2.classList.add("active");
      }
    }
    return false;
  };

  const [isActive, setIsActive] = useState(false);
  const menu = () => {
    setIsActive((current) => !current);
  };
  return (
    <>
      <Container>
      <div className="hamburger_manu_icon">
            <i className="bi bi-list fs-20 " onClick={menu}></i>
          </div>
        <Row className="justify-content-between mt-4">
          <Col sm={3} className="d-flex align-items-center">
            <Navbar.Brand href="/" onClick={menu} className="d-none d-lg-block">
              <div className="logo-dark">
                <Image src={AvonLogo} alt="Avon logo" height={80} />
              </div>
            </Navbar.Brand>
          </Col>
          <Col sm={9}>
            <Row>
              <Col sm={12}>
                <div className="d-flex align-items-center justify-content-end">
                  <Button
                    type="button"
                    className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle text-muted"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                    onClick={handleShow}
                  >
                    <i className="bx bx-search fs-22"></i>
                  </Button>
                  <SearchModal show={show} handleClose={handleClose} />
                  <div className="topbar-head-dropdown ms-1 header-item">
                    <Button
                      type="button"
                      className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle text-muted"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#ecommerceCart"
                      aria-controls="ecommerceCart"
                      onClick={handlecardShow}
                    >
                      <i className="ph-shopping-cart fs-18"></i>
                      <span className="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-danger">
                        {basket.length}
                      </span>
                    </Button>
                  </div>

                  <div className="topbar-head-dropdown ms-1 header-item">
                    <Link to="/shop/wishList">
                      <Button
                        type="button"
                        className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle text-muted"
                      >
                        <i className="ph-heart-bold fs-18"></i>
                        <span className="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-danger">
                          {wishlistAll.length}
                        </span>
                      </Button>
                    </Link>
                  </div>

                  <Dropdown
                    className="topbar-head-dropdown ms-2 header-item dropdown-hover-end"
                    align="start"
                  >
                    <Dropdown.Toggle
                      style={{ zIndex: 1006 }}
                      className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle text-muted"
                      bsPrefix="btn"
                    >
                      <i className="bi bi-sun align-middle fs-20"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu p-2 dropdown-menu-end"
                      id="light-dark-mode"
                    >
                      <Dropdown.Item
                        eventKey="light"
                        onClick={() => props.handleMood("light")}
                      >
                        <i className="bi bi-sun align-middle me-2"></i> Gündüz
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="dark"
                        onClick={() => props.handleMood("dark")}
                      >
                        <i className="bi bi-moon align-middle me-2"></i> Gecə
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="light"
                        onClick={() => props.handleMood("light")}
                      >
                        <i className="bi bi-moon-stars align-middle me-2"></i> Avtomatik
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <div className="dropdown header-item dropdown-hover-end">
                    {userData?.email ? (
                      <Dropdown>
                        <Dropdown.Toggle
                          id="page-header-user-dropdown"
                          bsPrefix="btn"
                          className="btn btn-icon btn-topbar btn-link rounded-circle"
                          as="a"
                        >
                          <Image
                            className="rounded-circle header-profile-user"
                            src={
                              userData?.profileImage.includes("https")
                                ? userData?.profileImage
                                : img1
                            }
                            alt="Header Avatar"
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ zIndex: 1005 }}>
                          <Dropdown.Item href="/hesabim/sifaris-tarixcesi">
                            <i className="bi bi-cart4 text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle">Sifariş tarixçəsi</span>
                          </Dropdown.Item>
                          <Dropdown.Item href="/shop/order">
                            <i className="bi bi-truck text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle">Sifariş izlə</span>
                          </Dropdown.Item>
                          <Dropdown.Item href="/hesabim">
                            <i className="bi bi-speedometer2 text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle">Hesabım</span>
                          </Dropdown.Item>
                          <Dropdown.Item href="/ecommerce-faq">
                            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle">Kömək</span>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <i className="bi bi-coin text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle">
                              Balans : <b>{userData.balance}₼</b>
                            </span>
                          </Dropdown.Item>
                          <Dropdown.Item href="/ana-sehife" onClick={logOut}>
                            <i className="bi bi-box-arrow-right text-muted fs-16 align-middle me-1"></i>{" "}
                            <span className="align-middle" data-key="t-logout">
                              Çıxış
                            </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <Link to={"/giris"}>
                        <IoLogIn style={{ fontSize: "23px", color: "black" }} />
                        <span className="ms-2 text-black">Hesabına daxil ol</span>
                      </Link>
                    )}
                  </div>
                </div>
              </Col>
              <Col sm={12} className="d-none d-md-flex justify-content-end">
                <div>
                  <Nav
                    as="ul"
                    className="mx-lg-auto mb-2 mb-lg-0 navbar_responsive_flex justify-content-end"
                    id="navigation-menu"
                  >
                    <li className="nav-item">
                      <Link
                        onClick={menu}
                        to="/ana-sehife"
                        className="nav-link"
                        data-key="t-home"
                      >
                        {props.t("home")}
                      </Link>
                    </li>
                    <li className="nav-item" style={{ color: "#A530B0 !important" }}>
                      <Link
                        onClick={menu}
                        className="nav-link"
                        to="/products"
                        data-key="t-contact"
                      >
                        {props.t("shop")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        onClick={menu}
                        className="nav-link"
                        to="/haqqimizda"
                        data-key="t-contact"
                      >
                        {props.t("about")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        onClick={menu}
                        className="nav-link"
                        to="/elaqe"
                        data-key="t-contact"
                      >
                        {props.t("contact")}
                      </Link>
                    </li>
                  </Nav>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <NavbarMenu isActive={isActive}/>
      {/* <CardModal show={card} handleClose={handlecardClose} /> */}
    </>
  );
};

export default memo(withRouter(withTranslation()(Header)));