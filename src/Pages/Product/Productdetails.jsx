import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tab,
  Tooltip,
  Nav,
  Table,
  ProgressBar,
  Breadcrumb,
  Form,
  Image,
  Card,
} from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import SimpleBar from "simplebar-react";
//scss
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

//components
import { productInterestedCard, productprogress } from "../../Common/data";
import { BrandedProduct } from "../../Components/ShopTopBar";
import { CommonService } from "../../Components/CommonService";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillExclamationCircle } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllBaskets } from "../../slices/layouts/basket";
import { getAllWisslist } from "../../slices/layouts/wistliss";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Productdetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [proDetail, setproDetail] = useState([]);
  const [sliderImg, setSliderImg] = useState([]);
  const [count, setCount] = useState(1);
  const { skuId } = useParams();
  const userId = useSelector((state) => state.persistedReducer.User.userId);
  const wisslistProID = useSelector(
    (state) => state.persistedReducer.Wisslist.wisslist
  );

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}Products/Manage/ProductGetForSkuId?SkuId=${skuId}`
      )
      .then((res) => {
        setproDetail(res.data.product);
      });
  }, [skuId]);

  const handleSetImg = (id) => {
    setSliderImg(
      proDetail.productImages.filter((selectImg, index) => index === id)
    );
  };

  //tooltip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Terms & Conditions
    </Tooltip>
  );

  //like button
  const dispatch = useDispatch();
  const handleLikeIcone = (skuId) => {
    if (userId) {
      if (wisslistProID.find((wish) => wish.productId == proDetail.id)) {
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}WishLists/RemoveWishList?skuId=${skuId}&appUserId=${userId}`,
            {
              skuId: skuId,
              appUserId: userId,
            }
          )
          .then((res) => {
            axios
              .get(
                `https://avonazerbaijan.com/api/WishLists/GetAll?appUserId=${userId}`
              )
              .then((res) => dispatch(getAllWisslist(res.data)));
          });

        toast.success("İstək siyahısından silindi", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        axios
          .post(
            `${process.env.REACT_APP_BASE_URL}WishLists/AddWishList?skuId=${skuId}&appUserId=${userId}`,
            {
              skuId: skuId,
              appUserId: userId,
            }
          )
          .then((res) => {
            axios
              .get(
                `https://avonazerbaijan.com/api/WishLists/GetAll?appUserId=${userId}`
              )
              .then((res) => dispatch(getAllWisslist(res.data)));
          });
        toast.success("İstək siyahısına əlavə olundu", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Zəhmət olmasa hesabınıza daxil olun", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const hendleClickBasket = async (skuId, count) => {
    try {
      if (userId) {
        const request = await axios.post(
          `${process.env.REACT_APP_BASE_URL}Baskets/AddBasket?appUserId=${userId}`,
          [
            {
              skuId: skuId,
              appUserId: userId,
              count: Number(count),
            },
          ]
        );
        const re = await axios.get(
          `${process.env.REACT_APP_BASE_URL}Baskets/GetAll?appUserId=${userId}`
        );
        dispatch(getAllBaskets(re.data));
        toast.success("Səbətə əlavə olundu", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        throw new Error("Zəhmət olmasa giriş edin");
      }
    } catch (error) {
      toast.error("Zəhmət olmasa hesabınıza daxil olun", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const desc = (data) => {
    return { __html: data };
  };
  return (
    <>
    <Helmet>
      <title>{`${proDetail.name} | AVONAZ.NET – Online kosmetika mağazası`}</title>
    </Helmet>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
      <section
        className="ecommerce-about"
        style={{
          backgroundImage: `url(${proDetail.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-overlay bg-primary" style={{ opacity: "0.85" }} />
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="text-center">
                <h1 className="text-white mb-0">Product Details</h1>
                <Breadcrumb bsPrefix="breadcrumb breadcrumb-light justify-content-center mt-4">
                  <Breadcrumb.Item href="#">Product</Breadcrumb.Item>
                  <Breadcrumb.Item active aria-current="page">
                    {" "}
                    Product Details{" "}
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
            {/*end col*/}
          </Row>
          {/*end row*/}
        </Container>
        {/*end container*/}
      </section>
      <section className="section">
        <Container>
          <Row className="gx-2">
            <Col lg={6}>
              <Row>
                <Col md={2}>
                  <div className="swiper productSwiper mb-3 mb-lg-0 swiper-initialized swiper-vertical swiper-pointer-events swiper-free-mode swiper-watch-progress swiper-backface-hidden swiper-thumbs">
                    <div
                      className="swiper-wrapper"
                      id="swiper-wrapper-6100bf53c3db1675b"
                      aria-live="polite"
                      style={{
                        transform: "translate3d(0px, 0px, 0px)",
                        transitionDuration: "0ms",
                      }}
                    >
                      {/* {(proDetail.productImages || [])?.map((item, idx) => {
                        return (
                          <div
                            key={idx}
                            className="swiper-slide swiper-slide-thumb-active swiper-slide-visible swiper-slide-next"
                            role="group"
                            aria-label={`${idx} / ${proDetail.productImages.length} `}
                            style={{ height: "105px", marginBottom: "10px" }}
                          >
                            <div className="product-thumb rounded cursor-pointer">
                              <Image
                                src={item?.image}
                                alt=""
                                fluid
                                onClick={() => handleSetImg(idx)}
                              />
                            </div>
                          </div>
                        );
                      })} */}
                    </div>
                    <span
                      className="swiper-notification"
                      aria-live="assertive"
                      aria-atomic="true"
                    />
                  </div>
                </Col>
                {/*end col*/}
                <Col md={10}>
                  <div className="bg-light rounded-2 position-relative ribbon-box overflow-hidden">
                    <div className="ribbon ribbon-danger ribbon-shape trending-ribbon">
                      <span className="trending-ribbon-text">Trending</span>
                      <i className="ri-flashlight-fill text-white align-bottom float-end ms-1" />
                    </div>

                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper2"
                    >
                      {(proDetail?.productImages || [])?.map((item, idx) => {
                        return (
                          <SwiperSlide key={idx}>
                            <Image src={item.image} alt="" fluid />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>

                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper"
                    >
                      {(proDetail?.productImages || [])?.map((item, idx) => {
                        return (
                          <SwiperSlide key={idx}>
                            <Image src={item.image} alt="" fluid />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </Col>
                {/*end col*/}
                <Col lg={12}>
                  <div className="mt-3">
                    <div className="hstack gap-2">
                      <Button
                        variant="success"
                        className="btn btn-hover w-100"
                        onClick={() => hendleClickBasket(skuId, count)}
                      >
                        {" "}
                        <i className="bi bi-basket2 me-2" /> Add To Cart
                      </Button>
                      <Button
                        className="btn btn-soft-danger custom-toggle btn-hover"
                        data-bs-toggle="button"
                        aria-pressed="false"
                        onClick={(ele) => handleLikeIcone(skuId)}
                      >
                        <span
                          className="icon-on"
                          style={
                            wisslistProID.find(
                              (wish) => wish.productId == proDetail.id
                            )
                              ? { display: "none" }
                              : { display: "block" }
                          }
                        >
                          <i className="ri-heart-line" />
                        </span>
                        <span
                          className="icon-off"
                          style={
                            wisslistProID.find(
                              (wish) => wish.productId == proDetail.id
                            )
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <i className="ri-heart-fill" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </Col>
                {/*end col*/}
              </Row>
              {/*end row*/}
            </Col>
            {/*end col*/}
            <Col lg={5} className="ms-auto">
              <div className="ecommerce-product-widgets mt-4 mt-lg-0">
                <div className="mb-4">
                  <h4 className="lh-base mb-1">{proDetail.name}</h4>
                  <p
                    className="text-muted mb-4"
                    dangerouslySetInnerHTML={desc(proDetail.description)}
                  ></p>
                  <h5 className="fs-24 mb-4">
                    {Number(
                      proDetail.salePrice -
                        (proDetail.salePrice / 100) * proDetail.discountPrice
                    ).toFixed(2)}
                    <span className="text-muted fs-14">
                      <del>{proDetail.salePrice}</del>
                    </span>
                    <span className="fs-14 ms-2 text-danger">
                      {" "}
                      ( {proDetail.discountPrice} off)
                    </span>
                  </h5>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <h5 className="fs-15 mb-0">Quanty:</h5>
                  <div className="input-step ms-2">
                    <Button
                      className="minus"
                      onClick={() => {
                        if (count > 1) {
                          setCount(count - 1);
                        } else {
                          toast.info("Məhsulun minimum miqdarı 1 olmalıdır");
                        }
                      }}
                    >
                      –
                    </Button>
                    <Form.Control
                      type="number"
                      className="product-quantity1"
                      value={count}
                      min={1}
                      max={5}
                    />
                    <Button
                      className="plus"
                      onClick={() => {
                        if (count < 5) {
                          setCount(count + 1);
                        } else {
                          toast.info("Məhsulun maksimum miqdarı 5 olmalıdır");
                        }
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Row className="gy-3">
                  <Col md={6}>
                    <div>
                      <h6 className="fs-14 fw-medium text-muted">
                        {proDetail?.variant?.type == "color"
                          ? "Colors"
                          : proDetail?.variant?.type == "size"
                          ? "Sizes"
                          : proDetail?.variant?.type == "weight"
                          ? "Weights"
                          : "Images"}
                        :
                      </h6>
                      {proDetail?.variant?.type == "color" ? (
                        proDetail?.relationOfBaseCode.length > 0 ? (
                          <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                            {proDetail?.relationOfBaseCode.map(
                              (color, index) => (
                                <Link
                                  key={index}
                                  to={`/product-details/${color.skuId}`}
                                >
                                  <li>
                                    <Form.Control
                                      type="radio"
                                      name="size1"
                                      id={`product-color-${color.skuId}`}
                                    />
                                    <Form.Label
                                      className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                      htmlFor={`product-color-${color.skuId}`}
                                      style={{
                                        backgroundColor: `${color.colorCode}`,
                                      }}
                                    >
                                      {color.colorCode == null && <FaCheck />}
                                    </Form.Label>
                                  </li>
                                </Link>
                              )
                            )}
                          </ul>
                        ) : (
                          <div className="avatar-xxs mb-3">
                            <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                              <AiFillExclamationCircle />
                            </div>
                          </div>
                        )
                      ) : proDetail?.variant?.type == "size" ? (
                        proDetail.relationOfBaseCode.length > 0 ? (
                          <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                            {proDetail.relationOfBaseCode.map(
                              (color, index) => (
                                <Link
                                  key={index}
                                  to={`/products-details/${color.skuId}`}
                                >
                                  <li>
                                    <Form.Control
                                      type="radio"
                                      name="size1"
                                      id={`product-color-${color.skuId}`}
                                    />
                                    <Form.Label
                                      className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                      htmlFor={`product-color-${color.skuId}`}
                                    >
                                      {color.colorCode == null ? (
                                        <FaCheck />
                                      ) : (
                                        <span>{color.colorCode}</span>
                                      )}
                                    </Form.Label>
                                  </li>
                                </Link>
                              )
                            )}
                          </ul>
                        ) : (
                          <div className="avatar-xxs mb-3">
                            <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                              <AiFillExclamationCircle />
                            </div>
                          </div>
                        )
                      ) : proDetail?.variant?.type == "file" ? (
                        proDetail.relationOfBaseCode.length > 0 ? (
                          <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                            {proDetail.relationOfBaseCode.map(
                              (color, index) => (
                                <Link
                                  key={index}
                                  to={`/products-details/${color.skuId}`}
                                >
                                  <li>
                                    <Form.Control
                                      type="radio"
                                      name="size1"
                                      id={`product-color-${color.skuId}`}
                                    />
                                    <Form.Label
                                      className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                      htmlFor={`product-color-${color.skuId}`}
                                      style={{
                                        backgroundImage: `url(${color.colorCode})`,
                                      }}
                                    >
                                      {color.colorCode == null && <FaCheck />}
                                    </Form.Label>
                                  </li>
                                </Link>
                              )
                            )}
                          </ul>
                        ) : (
                          <div className="avatar-xxs mb-3">
                            <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                              <AiFillExclamationCircle />
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="avatar-xxs mb-3">
                          <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                            <AiFillExclamationCircle />
                          </div>
                        </div>
                      )}
                      {proDetail?.variant?.type == "size" ? (
                        proDetail?.relationOfBaseCode.length > 0 ? (
                          <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                            {proDetail?.relationOfBaseCode.map(
                              (color, index) => (
                                <li key={index}>
                                  <Form.Control
                                    type="radio"
                                    name="size1"
                                    id={`product-color-${color?.skuId}`}
                                  />
                                  <Form.Label
                                    className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                    htmlFor={`product-color-${color?.skuId}`}
                                  >
                                    {color.colorCode == null ? (
                                      <FaCheck />
                                    ) : (
                                      <span>{color.colorCode}</span>
                                    )}
                                  </Form.Label>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <div className="avatar-xxs mb-3">
                            <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                              <AiFillExclamationCircle />
                            </div>
                          </div>
                        )
                      ) : proDetail?.variant?.type == "file" ? (
                        proDetail.relationOfBaseCode.length > 0 ? (
                          <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                            {proDetail.relationOfBaseCode.map(
                              (color, index) => (
                                <Link
                                  key={index}
                                  to={`/product-details/${color.skuId}`}
                                >
                                  <li>
                                    <Form.Control
                                      type="radio"
                                      name="size1"
                                      id={`product-color-${color.skuId}`}
                                    />
                                    <Form.Label
                                      className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                      htmlFor={`product-color-${color.skuId}`}
                                      style={{
                                        backgroundImage: `url(${color.colorCode})`,
                                      }}
                                    >
                                      {color.colorCode == null && <FaCheck />}
                                    </Form.Label>
                                  </li>
                                </Link>
                              )
                            )}
                          </ul>
                        ) : (
                          <div className="avatar-xxs mb-3">
                            <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                              <AiFillExclamationCircle />
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="avatar-xxs mb-3">
                          <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                            <AiFillExclamationCircle />
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            {/*end col*/}
          </Row>
          {/*end row*/}
        </Container>
        {/*end container*/}
      </section>
      <section className="section pt-0">
        <Container>
          <Row>
            <Col lg={12}>
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey="Description"
              >
                <Row>
                  <Col sm={12}>
                    <Nav variant="tabs" className="nav-tabs-custom mb-3">
                      <Nav.Item as="li">
                        <Nav.Link as="a" eventKey="Description">
                          Description
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="Description">
                        <div
                          className="tab-pane active show"
                          id="profile1"
                          role="tabpanel"
                        >
                          <Table className="table-sm table-borderless align-middle">
                            <tbody>
                              <tr>
                                <th>Type</th>
                                <td>{proDetail?.variant?.type}</td>
                              </tr>
                              <tr>
                                <th>uzunluq</th>
                                <td>{proDetail?.uzunluq}</td>
                              </tr>
                              <tr>
                                <th>width</th>
                                <td>{proDetail?.width}</td>
                              </tr>
                              <tr>
                                <th>heigth</th>
                                <td>{proDetail?.heigth}</td>
                              </tr>
                              <tr>
                                <th>veight</th>
                                <td>{proDetail?.veight}</td>
                              </tr>
                              <tr>
                                <th>variant.name</th>
                                <td>{proDetail?.variant?.name}</td>
                              </tr>
                            </tbody>
                          </Table>
                          <p
                            className="text-muted fs-15"
                            dangerouslySetInnerHTML={desc(
                              proDetail.description
                            )}
                          ></p>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
            {/*end col*/}
          </Row>
          {/*end row*/}
        </Container>
      </section>

      <div className="position-relative">
        <Container>
          <Row>
            <Col lg={12}>
              <h4 className="mb-4">You might be interested in</h4>
            </Col>
          </Row>
          <Row className="gy-3">
            {(productInterestedCard || [])?.map((item, idx) => {
              return (
                <Col lg={4} key={idx}>
                  <Card
                    as="a"
                    href="/products-grid/right"
                    className="card mb-3 card-animate stretched-link"
                  >
                    <Row className="g-0">
                      <Col sm={4}>
                        <Image
                          src={item.img}
                          className="rounded-start h-100 object-fit-cover"
                          alt="..."
                          fluid
                        />
                      </Col>
                      <Col sm={8}>
                        <Card.Body className="h-100 d-flex flex-column">
                          <h4 className={item.class}>{item.title}</h4>
                          <p className="card-text text-muted">{item.dic}</p>
                          <div className="mt-auto">
                            <div className={`btn btn-soft-${item.bg} btn-sm`}>
                              Shop Now
                            </div>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <BrandedProduct title="Similar Products" />
      <EmailClothe />
      <CommonService />
    </>
  );
};

export default Productdetails;
