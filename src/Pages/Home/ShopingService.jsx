import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, Col, Container, Image, Row } from "react-bootstrap";
import "./ShopingService.css";
import CountDownTimer from "./CountDownTimer";
import { getAllOfferWeeks } from "../../services/getRequests";
const Shopping = () => {
  const [offerOfWeeks, setofferOfWeeks] = useState([]);

  const getOffers = async () => {
    const res = await getAllOfferWeeks();
    setofferOfWeeks(res);
  };

  useEffect(() => {
    getOffers();
  }, []);

  const desc = (data) => {
    return { __html: data };
  };

  return (
    <>
      <section className="position-relative">
        <Container>
          <Carousel id="ecommerceHero" data-bs-ride="carousel">
            {offerOfWeeks.length > 0 &&
              offerOfWeeks.map((offerOfWeeksData) => {
                return (
                  <Carousel.Item key={offerOfWeeksData.id}>
                    <Row className="align-items-center">
                      <Col lg={6}>
                        <div className="py-5">
                          <p className="text-uppercase  badge badge-soft-danger fs-13">
                            {offerOfWeeksData.title1}
                          </p>

                          <h1 className="lh-base fw-semibold mb-3 text-capitalize">
                            {offerOfWeeksData.title2}
                          </h1>
                          <p
                            className="fs-16 mt-2"
                            dangerouslySetInnerHTML={desc(
                              offerOfWeeksData.description
                            )}
                          ></p>
                          <Row>
                            <Col lg={10}>
                              <div className="ecommerce-land-countdown mt-3 mb-0">
                                <CountDownTimer
                                  targetDate={offerOfWeeksData.date}
                                />
                              </div>
                            </Col>
                          </Row>
                          <div className="mt-4 pt-2 d-flex gap-2">
                            <Link
                              to={offerOfWeeksData.link}
                              className="btn btn-primary w-md btn-hover"
                            >
                              Ətraflı bax
                            </Link>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div>
                          <Image
                            src={offerOfWeeksData.image}
                            alt=""
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </Container>
      </section>
    </>
  );
};

export default Shopping;
