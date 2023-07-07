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
import { getAllProducts } from "../../services/getRequests";
import { AddToBasket } from "../../services/postRequests";
const Productdetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [proDetail, setproDetail] = useState([]);
  const [sliderImg, setSliderImg] = useState([]);
  const [count, setCount] = useState(1);
  const { slug } = useParams();
  const userId = useSelector((state) => state.persistedReducer.User.userId);
  const wisslistProID = useSelector(
    (state) => state.persistedReducer.Wisslist.wisslist
  );

  const skuId = proDetail.skuId;
  useEffect(() => {
    axios
      .get(`https://avonazerbaijan.com/mehsullar?slug=${slug}`)
      .then((res) => {
        setproDetail(res.data.product);
      });
    getProdcts();
  }, [slug]);

  const [products, setProducts] = useState([]);

  const getProdcts = async () => {
    try {
      const data = await getAllProducts(1);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

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

        toast.success("İstək siyahısından silindi");
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
        toast.success("İstək siyahısına əlavə olundu");
      }
    } else {
      toast.error("Zəhmət olmasa hesabınıza daxil olun");
    }
  };

  const hendleClickBasket = async (skuId, count, stockCount) => {
    try {
      if (userId) {
        if (count > stockCount) {
          toast.info(`${skuId}-li məhsulun stokda sayı ${stockCount} qədərdir`);
        } else {
          const request = await AddToBasket(userId, [
            {
              skuId: skuId,
              count: Number(count),
            },
          ]);
          if (request == "Stokda bu məhsul yoxdur !") {
            toast.info(request);
          } else {
            const re = await axios.get(
              `${process.env.REACT_APP_BASE_URL}Baskets/GetAll?appUserId=${userId}`
            );
            dispatch(getAllBaskets(re.data));
            toast.success("Səbətə əlavə olundu");
          }
        }
      } else {
        throw new Error("Zəhmət olmasa giriş edin");
      }
    } catch (error) {
      toast.error(`${error.message}`);
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
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
      <section className="ecommerce-about" >
        <div className="bg-overlay bg-primary" style={{ opacity: "0.85" }} />
        <Container>
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className="text-center">
                <h1 className="text-white mb-0">{proDetail.name}</h1>
                <Breadcrumb bsPrefix="breadcrumb breadcrumb-light justify-content-center mt-4">
                  <Breadcrumb.Item href="/mehsullar">Məhsullar</Breadcrumb.Item>
                  <Breadcrumb.Item active aria-current="page">
                    {" "}
                    {proDetail.name}{" "}
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
                <Col md={12}>
                  <div className="bg-light rounded-2 position-relative ribbon-box overflow-hidden">
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

                {/*end col*/}
              </Row>
              {/*end row*/}
            </Col>
            {/*end col*/}
            <Col lg={5} className="ms-auto">
              <div className="ecommerce-product-widgets mt-4 mt-lg-0">
                <div className="mb-4">
                  <h4 className="lh-base mb-1">{proDetail.name}</h4>
                  {
                    proDetail.discountPrice > 0
                      ? <h5 className="mb-4" style={{ fontSize: '38px', color: '#e5004b' }}>
                        {Number(
                          proDetail.salePrice -
                          (proDetail.salePrice / 100) * proDetail.discountPrice
                        ).toFixed(2)}₼
                        <span className="text-muted fs-14">
                          <del>{proDetail.salePrice}₼</del>
                        </span>
                        <span className="fs-14 ms-2 text-danger">
                          {" "}
                          ( {proDetail.discountPrice}% endirim)
                        </span> : null
                      </h5>
                      : <h5 className="mb-4" style={{ fontSize: '38px', color: '#e5004b' }}>
                        {proDetail.salePrice} ₼
                      </h5>
                  }

                </div>

                <Row className="gy-3">
                  <Col md={6}>
                    <div>
                      <h6 className="fs-14 fw-medium text-muted">
                        {proDetail?.variant?.type == "color"
                          ? "Rəng çeşidləri"
                          : proDetail?.variant?.type == "size"
                            ? "Ölçü çeşidləri"
                            : proDetail?.variant?.type == "weight"
                              ? "Çəki çeşidləri"
                              : "Çeşidləri Yoxdur"}
                      </h6>
                      {proDetail?.variant?.type == "color" ? (
                        proDetail?.relationOfBaseCode.length > 0 ? (
                          <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                            {proDetail?.relationOfBaseCode.map(
                              (color, index) => (
                                <Link
                                  key={index}
                                  to={`/mehsul-detallari/${proDetail.slug}`}
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
                                  to={`/mehsul-detallari/${proDetail.slug}`}
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
                                  to={`/mehsul-detallari/${proDetail.slug}`}
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
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className="d-flex align-items-center">
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
                  </Col>
                  <Col lg={8}>
                    <div className="hstack gap-2">
                      <Button
                        variant="danger"
                        className="btn btn-hover w-100"
                        onClick={() =>
                          hendleClickBasket(skuId, count, proDetail?.stockCount)
                        }
                      >
                        {" "}
                        <i className="bi bi-basket2 me-2" />Səbətə əlavə et
                      </Button>
                    </div>
                  </Col>


                  <Col lg={12}>
                    <div className="mt-3">
                      <div className="hstack gap-2 justify-content-end">
                        <Button
                          className="btn btn-soft-danger custom-toggle btn-hover"
                          data-bs-toggle="button"
                          aria-pressed="false"
                          onClick={() => handleLikeIcone(skuId)}
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
                            <i className="ri-heart-line" /> Sevimlilərə əlavə et
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
                            <i className="ri-heart-fill" /> Sevimlilərdən çıxar
                          </span>
                        </Button>
                      </div>
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
                          Açıqlama
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link as="a" eventKey="Others">
                          Digər xüsusiyyətlər
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
                          <p
                            className="text-muted fs-15"
                            dangerouslySetInnerHTML={desc(
                              proDetail.description
                            )}
                          ></p>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="Others">
                        <div
                          className="tab-pane active show"
                          id="profile1"
                          role="tabpanel"
                        >
                          <Table className="table-sm table-borderless align-middle">
                            <tbody>
                              <tr>
                                <th>Məhsul kodu</th>
                                <td>{proDetail?.productCode}</td>
                              </tr>
                              <tr>
                                <th>SKU kodu</th>
                                <td>{proDetail?.skuId}</td>
                              </tr>
                              <tr>
                                <th>Brendi</th>
                                <td>{proDetail?.brand?.name}</td>
                              </tr>
                              <tr>
                                <th>Kateqoriyası</th>
                                <td>
                                  {
                                    proDetail?.productSubCategories?.[0]
                                      ?.subCategory?.name
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th>Çəkisi</th>
                                <td>{proDetail?.veight} kq</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="position-relative">
        <Container>
          <Row>
            <Col lg={12}>
              <h4 className="mb-4">Həmçinin bunlarda maraqlı ola bilər</h4>
            </Col>
          </Row>
          <Row className="gy-3">
            {(products || [])
              ?.filter((item) => item.isDefault === true)
              .slice(0, 3)
              .map((item, idx) => {
                return (
                  <Col lg={4} key={idx}>
                    <Card
                      as="a"
                      href={`/mehsul-detallari/${item.slug}`}
                      className="card mb-3 card-animate stretched-link"
                    >
                      <Row className="g-0">
                        <Col sm={4}>
                          <Image
                            src={item.posterImage}
                            className="rounded-start w-100 object-fit-cover"
                            style={{ maxHeight: "200px", height: "200px" }}
                            alt="..."
                            fluid
                          />
                        </Col>
                        <Col sm={8}>
                          <Card.Body className="h-100 d-flex flex-column">
                            {/* <p className="card-text text-muted">{item.productSubCategories[0].subCategory.name}</p> */}
                            <h4 className="card-title">{item.name}</h4>
                            <p className="card-text text-muted">
                              {item.salePrice} ₼
                            </p>
                            <div className="mt-auto">
                              <div className={`btn btn-soft-secondary btn-sm`}>
                                Ətraflı bax
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
      <BrandedProduct title="Oxşar məhsullar" />
      <EmailClothe />
    </>
  );
};

export default Productdetails;
