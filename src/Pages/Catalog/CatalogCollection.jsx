import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Form, Row, Col, Card, Button, Image } from "react-bootstrap";
import "./Catalog.css";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllBasket } from "../../services/getRequests";
import { AddToBasket } from "../../services/postRequests";
import axios from "axios";
import { getAllBaskets } from "../../slices/layouts/basket";
import { getAllWisslist } from "../../slices/layouts/wistliss";

const CatalogCollection = ({
  cxxl,
  cxl,
  clg,
  cmd,
  cheight,
  count,
  setCount,
  currentPage,
  setCurrentPage,
  products,
  setProducts,
  slug = null
}) => {
  const [selectItem, setSelectItem] = useState([]);

  const userId = useSelector((state) => state.persistedReducer.User.userId);
  const wishlistAll = useSelector(
    (state) => state.persistedReducer.Wisslist.wisslist
  );

  const dispatch = useDispatch();

  const handleLikeIcone = (skuId) => {
    if (userId) {
      const checkWish = wishlistAll.find((it) => it.product.skuId == skuId);
      if (checkWish) {
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

  const handleSKUChange = (a) => {
    setSelectItem(a);
  };
  const addToCart = async (skuId, appUserId) => {
    const res = await AddToBasket(appUserId, [{ skuId, count: 1 }]);
    const re = await getAllBasket(appUserId);
    toast.success("Məhsul səbətə əlavə olundu");
    dispatch(getAllBaskets(re));
  };

  return (
    <>
      <div className="flex-grow-1">
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
        <div className="d-flex align-items-center gap-2 mb-4">
          <p className="text-muted flex-grow-1 mb-0">
            <span>{products.length}</span> nəticə
          </p>

          <div className="flex-shrink-0">
            <div className="d-flex gap-2">
              <div className="flex-shrink-0">
                <Form.Label htmlFor="sort-elem" className="col-form-label">
                  Sırala:
                </Form.Label>
              </div>
              <div className="flex-shrink-0">
                <Form.Select
                  className="form-select w-md"
                  onChange={(e) => {
                    if (e.target.value == "lowtohigh") {
                      const sortBy = products.sort(
                        (a, b) => a.salePrice - b.salePrice
                      );
                      setProducts([...sortBy]);
                    } else {
                      const sortBY = products.sort(
                        (a, b) => b.salePrice - a.salePrice
                      );
                      setProducts([...sortBY]);
                    }
                  }}
                  id="sort-elem"
                >
                  <option value="all">Hamısı</option>
                  <option value="lowtohigh">Ucuzdan bahaya</option>
                  <option value="hightolow">Bahadan ucuza</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
        <Row id="product-grid">
          {products.length > 0 ? (
            products.map((item, i) => {
              return (
                !cxl && (
                  <Col key={item.id} xxl={cxxl} lg={clg} md={cmd}>
                    <Card className="ecommerce-product-widgets border-0 rounded-0 shadow-none overflow-hidden">
                      <div
                        className="bg-light bg-opacity-50 rounded py-4 position-relative"
                        style={{ height: "250px" }}
                      >
                        <Image
                          src={item?.posterImage}
                          alt=""
                          style={{
                            maxHeight: `${cheight || ""}`,
                            maxWidth: "100%",
                            objectFit: 'cover'
                          }}
                          className="mx-auto d-block rounded-2 h-100"
                        />
                        <div className="action vstack gap-2">
                          <Button
                            color="danger"
                            className="avatar-xs p-0 btn-soft-warning custom-toggle product-action"
                            data-bs-toggle="button"
                            onClick={() => handleLikeIcone(item.skuId)}
                          >
                            <span
                              className="icon-on"
                              style={
                                wishlistAll.find(
                                  (wish) => wish.productId == item.id
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
                                wishlistAll.find(
                                  (wish) => wish.productId == item.id
                                )
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              <i className="ri-heart-fill" />
                            </span>
                          </Button>
                        </div>
                        {item?.relationOfBaseCode !== null &&
                          <div className="avatar-xs label">
                            <div className="avatar-title bg-danger rounded-circle fs-11">
                              {item?.relationOfBaseCode != null && item?.relationOfBaseCode[count[i]]?.discountPrice}
                              %
                            </div>
                          </div>
                        }
                      </div>
                      <div className="pt-4">
                        <div>
                          {item?.variant?.type == "color" ? (
                            item.relationOfBaseCode.length > 0 ? (
                              <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                                {item.relationOfBaseCode.map((color, index) => (
                                  <li key={index}>
                                    <Form.Control
                                      type="radio"
                                      name="sizes1"
                                      id={`product-color-${color.skuId}`}
                                      onClick={() => {
                                        handleSKUChange(color.skuId);
                                        setCount((count) =>
                                          count.map((c, idx) => {
                                            if (idx == i) {
                                              c = index;
                                            }
                                            return c;
                                          })
                                        );
                                      }}
                                    />
                                    <Form.Label
                                      className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                      htmlFor={`product-color-${color.skuId}`}
                                      style={{
                                        width: "30px",
                                        height: "30px",
                                        backgroundColor: `${color.colorCode}`,
                                      }}
                                    >
                                      {color.colorCode == null && <FaCheck />}
                                    </Form.Label>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="avatar-xxs mb-3">
                                <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                                  <AiFillExclamationCircle />
                                </div>
                              </div>
                            )
                          ) : item?.variant?.type == "file" ? (
                            item.relationOfBaseCode.length > 0 ? (
                              <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                                {item.relationOfBaseCode.map((color, index) => (
                                  <li key={color.skuId}>
                                    <Form.Control
                                      type="radio"
                                      name="sizes1"
                                      id={`product-color-${color.skuId}`}
                                      onClick={() => {
                                        handleSKUChange(color.skuId);
                                        setCount((count) =>
                                          count.map((c, idx) => {
                                            if (idx == i) {
                                              c = index;
                                            }
                                            return c;
                                          })
                                        );
                                      }}
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
                                ))}
                              </ul>
                            ) : (
                              <div className="avatar-xxs mb-3">
                                <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                                  <AiFillExclamationCircle />
                                </div>
                              </div>
                            )
                          ) : item?.variant?.type == "size" ? (
                            item.relationOfBaseCode.length > 0 ? (
                              <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                                {item.relationOfBaseCode.map((color) => (
                                  <li key={color.id}>
                                    <Form.Control
                                      type="radio"
                                      name="sizes1"
                                      id={`product-color-${color.id}`}
                                      onClick={() => {
                                        setSelectItem(color.skuId);
                                      }}
                                    />
                                    <Form.Label
                                      className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                      htmlFor="product-color-12"
                                    >
                                      {color.variable}
                                    </Form.Label>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="avatar-xxs mb-3">
                                <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                                  <AiFillExclamationCircle />
                                </div>
                              </div>
                            )
                          ) : null}

                          <Link to={`/mehsul-detallari/${item.slug}`}>
                            <h6 className="text-capitalize fs-15 lh-base text-truncate mb-0">
                              {item?.name}
                            </h6>
                          </Link>
                          <div className="mt-2">
                            {item?.relationOfBaseCode != null ? item?.relationOfBaseCode[count[i]]?.discountPrice >
                              0 ? (
                              <>
                                <h5 className="text-secondary mb-0">
                                  {Number(
                                    item?.relationOfBaseCode[count[i]]
                                      .salePrice -
                                    (item?.relationOfBaseCode[count[i]]
                                      .salePrice /
                                      100) *
                                    item?.relationOfBaseCode[count[i]]
                                      .discountPrice
                                  ).toFixed(2)}{" "}
                                  ₼
                                  <span className="text-muted fs-12">
                                    <del>
                                      {
                                        item?.relationOfBaseCode[count[i]]
                                          .salePrice
                                      }{" "}
                                      ₼
                                    </del>
                                  </span>
                                </h5>
                              </>
                            ) : (
                              <h5 className="text-secondary mb-0">
                                {item?.relationOfBaseCode[count[i]]?.salePrice} ₼
                              </h5>
                            ) : <h5 className="text-secondary mb-0">
                              {Number(
                                item?.salePrice -
                                (item?.salePrice /
                                  100) *
                                  item?.discountPrice
                            ).toFixed(2)}{" "}
                            ₼
                            {item?.discountPrice != 0 &&  <span className="text-muted fs-12">
                              <del>
                                { 
                                item?.salePrice
                                }
                                ₼
                              </del>
                            </span>}
                           
                          </h5>}
                          </div>
                          <div className="tn mt-3">
                            <Button
                              className="btn btn-primary btn-hover w-100 add-btn"
                              onClick={() => {
                                if (userId) {
                                  addToCart(
                                    item?.relationOfBaseCode != null ? item.relationOfBaseCode[count[i]]?.skuId : item?.skuId,
                                    userId
                                  );
                                } else {
                                  toast.error(
                                    "Zəhmət olmasa hesabınıza daxil olun",
                                    {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    }
                                  );
                                }
                              }}
                            >
                              <i className="mdi mdi-cart me-1"></i> Səbətə əlavə
                              et
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                )
              );
            })
          ) : (
            <>
              <Row id="search-result-elem">
                <Col lg={12}>
                  <div className="text-center py-5">
                    <div className="avatar-lg mx-auto mb-4">
                      <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                        <i className="bi bi-search"></i>
                      </div>
                    </div>

                    <h5>Uyğun nəticə tapılmadı</h5>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Row>
        {slug == null && <Button onClick={() => setCurrentPage(currentPage + 1)}>
          Daha Çoxu
        </Button>}
      </div>
    </>
  );
};

export default CatalogCollection;
