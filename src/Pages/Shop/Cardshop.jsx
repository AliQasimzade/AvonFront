import React, { useState } from "react";
import { Card, Col, Row, Button, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Shoporder } from "../../Components/ShopTopBar";
import DeleteModal from "../../Components/DeleteModal";
import { useSelector, useDispatch } from "react-redux";

import { updateDecBasket, updateIncBasket } from "../../slices/layouts/basket";

const Cardshop = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.persistedReducer.Basket.basket);
  const userData = useSelector(state => state.persistedReducer.Accont.user[0])
  const [removeModel, setRemovemodel] = useState(false);
  const RemoveModel = (id) => {
    setRemovemodel(!removeModel);
  
  };

  const deleteData = () => {
    
  };

  const subtotal = Number(basket.reduce((acc, item) => acc + (item.productCount * item.product.salePrice.toFixed(2)), 0)).toFixed(2)

  const countUP = (item, id) => {
    console.log(item, id);
    dispatch(updateIncBasket(id))
    
  };

  const countDown = (item, id) => {
    console.log(item, id);
    if (item == 0) {
    } else {
       dispatch(updateDecBasket(id))
    
    }
  };

  return (
    <>  
      <Col lg={8}>
        <div className="d-flex align-items-center mb-4">
          <h5 className="mb-0 flex-grow-1 fw-medium">
            Səbətinizdə <span className="fw-bold product-count">{basket.length}</span> məhsul var
          </h5>
          <div className="flex-shrink-0">
            <Link to="#" className="text-decoration-underline link-secondary">
              Səbəti təmizlə
            </Link>
          </div>
        </div>
        {basket.length > 0 &&
          basket.map((item, inx) => {
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
                            style={{width:'100px', height:'100px', objectFit:'cover'}}
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
                          Color :{" "}
                          <span className="fw-medium">{item.Color}</span>
                        </li>
                        {item.Size && (
                          <li className="list-inline-item">
                            Size :{" "}
                            <span className="fw-medium">{item.Size || ""}</span>
                          </li>
                        )}
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
                          max="100"
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
                        <p className="text-muted mb-1 fs-12">Item Price:</p>
                        <h5 className="fs-16">
                          $
                          <span className="product-price">
                            {Number(item.product.salePrice).toFixed(2)}
                          </span>
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
                          <Link
                            to="#"
                            className="d-block text-body p-1 px-2"
                            data-bs-toggle="modal"
                            data-bs-target="#removeItemModal"
                            onClick={() => RemoveModel(item.id)}
                          >
                            <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>{" "}
                            Remove
                          </Link>
                        </div>
                        <div>
                          <Link to="#" className="d-block text-body p-1 px-2">
                            <i className="ri-star-fill text-muted align-bottom me-1"></i>{" "}
                            Add Wishlist
                          </Link>
                        </div>
                      </div>
                    </Col>
                    <Col className="col-sm-auto">
                      <div className="d-flex align-items-center gap-2 text-muted">
                        <div>Total :</div>
                        <h5 className="fs-14 mb-0">
                          $
                          <span className="product-line-price">
                            {Number(
                              item.productCount *
                                item.product.salePrice.toFixed(2)
                            ).toFixed(2)}
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
            total={subtotal}
          />
          <div className="hstack gap-2 justify-content-end">
            <Link to='/products' variant="danger" className="btn btn-hover">
              Alış-verişə davam et
            </Link>
            <Link to='/resmilesdirme' variant="success" className="btn btn-hover">
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
