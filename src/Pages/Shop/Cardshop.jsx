import React, { useState } from "react";
import { Card, Col, Row, Button, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Shoporder } from "../../Components/ShopTopBar";
import DeleteModal from "../../Components/DeleteModal";
import { useSelector, useDispatch } from "react-redux";
import {
  updateIncBasket,
  updateDecBasket,
  getAllBaskets,
} from "../../slices/layouts/basket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getAllWisslist } from "../../slices/layouts/wistliss";

const Cardshop = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.persistedReducer.Basket.basket);
  const wishlistAll = useSelector(
    (state) => state.persistedReducer.Wisslist.wisslist
  );

  const userData = useSelector(
    (state) => state.persistedReducer.Accont.user
  );

  const [removeModel, setRemovemodel] = useState(false);
  const [selectedSkuId, setSelectedSkuId] = useState("");
  const RemoveModel = (id, c) => {
    setRemovemodel(!removeModel);
    setSelectedSkuId([{ skuId: id, count: Number(c) }]);
  };
  const deleteData = async () => {
    try {
      const req1 = await axios.post(
        `${process.env.REACT_APP_BASE_URL}Baskets/RemoveBasket?appUserId=${userData.id}`,
        selectedSkuId
      );
      const req2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}Baskets/GetAll?appUserId=${userData.id}`
      );

      const responses = await Promise.all([req1, req2]);
      dispatch(getAllBaskets(responses[1].data));
      toast.success("Məhsul səbətdən silindi");
    } catch (error) {
      toast.error("Sorğuda xəta baş verdi");
    }
  };

  const total =
    basket.length > 0
      ? Number(
          basket.reduce(
            (acc, item) => acc + item.productCount * item.product.salePrice,
            0
          )
        ).toFixed(2)
      : 0;
  const filterByOriginalPriceNotNull =
    basket.length > 0
      ? basket
          .filter((item) => item.originalPrice != null)
          .reduce(
            (acc, item) => acc + item.productCount * item.originalPrice,
            0
          )
      : 0;
  const filterByOriginalPriceNull =
    basket.length > 0
      ? basket
          .filter((item) => item.originalPrice == null)
          .reduce(
            (acc, item) => acc + item.productCount * item.product.salePrice,
            0
          )
      : 0;

  const subtotal = filterByOriginalPriceNotNull + filterByOriginalPriceNull;
  const countUP = (item, id) => {
    dispatch(updateIncBasket(id));
  };

  const countDown = (item, id) => {
    if (item == 0) {
    } else {
      dispatch(updateDecBasket(id));
    }
  };
  const deleteAllBasket = async () => {
    try {
      const rest = basket.map((item) => {
        return {
          skuId: item.product.skuId,
          count: Number(item.productCount),
        };
      });
      const request = await axios.post(
        `${process.env.REACT_APP_BASE_URL}Baskets/RemoveBasket?appUserId=${userData.id}`,
        rest
      );
      dispatch(getAllBaskets([]));
      toast.success("Səbət uğurla sıfırlandı");
    } catch (error) {
      toast.error("Sorğuda xəta baş verdi");
    }
  };

  const updateBasket = async () => {
    try {
      const rest = basket.map((item) => {
        return {
          skuId: item.product.skuId,
          count: Number(item.productCount),
        };
      });
      const request1 = await axios.post(
        `${process.env.REACT_APP_BASE_URL}Baskets/UpdateBasket?appUserId=${userData.id}`,
        rest
      );
      const request2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}Baskets/GetAll?appUserId=${userData.id}`
      );

      const responses = await Promise.all([request1, request2]);
      dispatch(getAllBaskets(responses[1].data));
      toast.success("Səbət uğurla yeniləndi");
    } catch (error) {
      toast.error("Sorğuda xəta baş verdi");
    }
  };

  const addWishlist = async (id) => {
    try {
      const checkWish = wishlistAll.find((wish) => wish.product.skuId == id);

      if (checkWish) {
        toast.info("Bu məhsul artıq istək siyahısında var");
      } else {
        const req1 = await axios.post(
          `${process.env.REACT_APP_BASE_URL}WishLists/AddWishList?skuId=${id}&appUserId=${userData.id}`
        );
        const req2 = await axios.get(
          `${process.env.REACT_APP_BASE_URL}WishLists/GetAll?appUserId=${userData.id}`
        );

        const responses = await Promise.all([req1, req2]);
        dispatch(getAllWisslist(responses[1].data));
        toast.success("Məhsul istək siyahısına əlav olundu");
      }
    } catch (error) {
      toast.error("Sorğuda xəta baş verdi");
    }
  };
  return (
    <>
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
      <Col lg={8}>
        <div className="d-flex align-items-center mb-4">
          <h5 className="mb-0 flex-grow-1 fw-medium">
            Səbətinizdə{" "}
            <span className="fw-bold product-count">{basket.length}</span>{" "}
            məhsul var
          </h5>
          <div className="flex-shrink-0 gap-3 d-flex">
            <Button
              className="bg-danger text-white border-0"
              onClick={deleteAllBasket}
            >
              Səbəti təmizlə
            </Button>

            <Button className="bg-info text-white" onClick={updateBasket}>
              Səbəti yenilə
            </Button>
          </div>
        </div>
        <h3>
          Endirimli məhsullar -
          {basket.length > 0 && basket.find((i) => i.basketDiscountPrice !== null) ? `${basket.find((i) => i.basketDiscountPrice !== null).basketDiscountPrice} %` : "Yoxdur"
            }
        </h3>
        {basket.length > 0 &&
          basket
            .filter((it) => it.originalPrice !== null)
            .map((item, inx) => {
              return (
                <Card key={inx} className="product">
                  <Card.Body className="p-4">
                    <Row className="gy-3">
                      <Col className="col-sm-auto">
                        <div className="avatar-lg h-100">
                          <div className={`avatar-title bg-subtle rounded`}>
                            <Image
                              src={item.product.posterImage}
                              alt=""
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                              className="avatar-md"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-sm">
                        <Link to="#">
                          <h5 className="fs-16 lh-base mb-1">
                            {item.product.name}
                          </h5>
                        </Link>
                        <ul className="list-inline text-muted fs-13 mb-3">
                          <li className="list-inline-item">
                            Endirimsiz qiyməti :
                            <span className="fw-medium">
                              {item.originalPrice}
                            </span>
                          </li>
                        </ul>
                        <div className="input-step">
                          <Button
                            className="minus"
                            onClick={() =>
                              countDown(item.productCount, item.product.skuId)
                            }
                          >
                            –
                          </Button>
                          <Form.Control
                            type="number"
                            className="product-quantity"
                            value={item.productCount}
                            min="0"
                            max={item.product.stockCount}
                            readOnly
                          />
                          <Button
                            className="plus"
                            onClick={() =>
                              countUP(item.productCount, item.product.skuId)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                      <Col className="col-sm-auto">
                        <div className="text-lg-end">
                          <p className="text-muted mb-1 fs-12">Qiyməti:</p>
                          <h5 className="fs-16">
                            <span className="product-price">
                              {Number(item.product.salePrice).toFixed(2)}
                            </span>
                            ₼
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <Row className="align-items-center gy-3">
                      <Col className="col-sm">
                        <div className="d-flex flex-wrap my-n1">
                          <div>
                            <Button
                              className="d-block text-body bg-white border-0 p-1 px-2"
                              data-bs-toggle="modal"
                              data-bs-target="#removeItemModal"
                              onClick={() =>
                                RemoveModel(item.skuId, item.productCount)
                              }
                            >
                              <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>{" "}
                              Sil
                            </Button>
                          </div>
                          <div>
                            <Button
                              className="d-block text-body bg-white border-0 p-1 px-2"
                              onClick={() => addWishlist(item.skuId)}
                            >
                              <i className="ri-star-fill text-muted align-bottom me-1"></i>
                              İstək siyahısına əlavə et
                            </Button>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-sm-auto">
                        <div className="d-flex align-items-center gap-2 text-muted">
                          <div>Total :</div>
                          <h5 className="fs-14 mb-0">
                            <span className="product-line-price">
                              {Number(
                                item.productCount *
                                  item.product.salePrice.toFixed(2)
                              ).toFixed(2)}
                              ₼
                            </span>
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              );
            })}

        <h3>Endirimdən kənar olan məhsullar</h3>
        {basket.length > 0 &&
          basket
            .filter((it) => it.originalPrice == null)
            .map((item, inx) => {
              return (
                <Card key={inx} className="product">
                  <Card.Body className="p-4">
                    <Row className="gy-3">
                      <Col className="col-sm-auto">
                        <div className="avatar-lg h-100">
                          <div className={`avatar-title bg-subtle rounded`}>
                            <Image
                              src={item.product.posterImage}
                              alt=""
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                              className="avatar-md"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col className="col-sm">
                        <Link to="#">
                          <h5 className="fs-16 lh-base mb-1">
                            {item.product.name}
                          </h5>
                        </Link>
                        <div className="input-step">
                          <Button
                            className="minus"
                            onClick={() =>
                              countDown(item.productCount, item.product.skuId)
                            }
                          >
                            –
                          </Button>
                          <Form.Control
                            type="number"
                            className="product-quantity"
                            value={item.productCount}
                            min="0"
                            max={item.product.stockCount}
                            readOnly
                          />
                          <Button
                            className="plus"
                            onClick={() =>
                              countUP(item.productCount, item.product.skuId)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                      <Col className="col-sm-auto">
                        <div className="text-lg-end">
                          <p className="text-muted mb-1 fs-12">Qiyməti:</p>
                          <h5 className="fs-16">
                            <span className="product-price">
                              {Number(item.product.salePrice).toFixed(2)}
                            </span>₼
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <Row className="align-items-center gy-3">
                      <Col className="col-sm">
                        <div className="d-flex flex-wrap my-n1">
                          <div>
                            <Button
                              className="d-block text-body bg-white border-0 p-1 px-2"
                              data-bs-toggle="modal"
                              data-bs-target="#removeItemModal"
                              onClick={() =>
                                RemoveModel(item.skuId, item.productCount)
                              }
                            >
                              <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>{" "}
                              Sil
                            </Button>
                          </div>
                          <div>
                            <Button
                              className="d-block text-body bg-white border-0 p-1 px-2"
                              onClick={() => addWishlist(item.skuId)}
                            >
                              <i className="ri-star-fill text-muted align-bottom me-1"></i>
                              İstək siyahısına əlavə et
                            </Button>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-sm-auto">
                        <div className="d-flex align-items-center gap-2 text-muted">
                          <div>Yekun :</div>
                          <h5 className="fs-14 mb-0">
                            <span className="product-line-price">
                              {Number(
                                item.productCount *
                                  item.product.salePrice.toFixed(2)
                              ).toFixed(2)}₼
                            </span>
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              );
            })}
      </Col>
      <div className="col-xl-4">
        <div className="sticky-side-div">
          <Shoporder
            subtotal={subtotal}
            total={total}
            dic={
              basket.length > 0 && basket.find((d) => d.basketDiscountPrice != null) ? basket.find((d) => d.basketDiscountPrice != null).basketDiscountPrice : 0
            }
          />
          <div className="hstack gap-2 justify-content-end">
            <Link to="/mehsullar" variant="danger" className="btn btn-hover">
              Alış-verişə davam et
            </Link>
            <Link
              to="/resmilesdirme"
              variant="success"
              className="btn btn-hover"
            >
              Rəsmiləşdir{" "}
              <i className="ri-logout-box-r-line align-bottom ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
      <DeleteModal
        removeModel={removeModel}
        hideModal={RemoveModel}
        deleteData={deleteData}
      />
    </>
  );
};

export default Cardshop;
