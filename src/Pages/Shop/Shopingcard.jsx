import React from "react";
import { Row, Col, Alert, Container } from "react-bootstrap";
import Cardshop from "./Cardshop";
import { useSelector } from "react-redux";
import { BrandedProduct, Shoptopbar } from "../../Components/ShopTopBar";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { CommonService } from "../../Components/CommonService";

const Shopingcard = () => {
  const basket = useSelector((state) => state.persistedReducer.Basket.basket);
  document.title = "Səbət | Avon Azərbaycan";

  return (
    <>
      <Shoptopbar title="Səbət" page="Səbət" />
      <section className="section">
        <Container>
          <Row className="product-list justify-content-center">
            {basket.length > 0 ? (
              <Cardshop />
            ) : (
              <Row
                id="search-result-elem"
                className="d-flex justify-content-center flex-grow-1"
              >
                <Col lg={12}>
                  <div className="text-center py-5">
                    <div className="avatar-lg mx-auto mb-4">
                      <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                        <i className="bi bi-search"></i>
                      </div>
                    </div>

                    <h5>Səbətdə heç bir məhsul yoxdur</h5>
                  </div>
                </Col>
              </Row>
            )}
          </Row>
        </Container>
      </section>
      <EmailClothe />
      <CommonService />
    </>
  );
};

export default Shopingcard;
