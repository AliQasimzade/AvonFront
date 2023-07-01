import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Col, Container, Row, Image } from "react-bootstrap";
import profileBg from "../../../assets/images/profile-bg.jpg";

const NewsDetail = () => {
  const { slug } = useParams();
  const [newsInfo, setNewsInfo] = useState(null);

  const getNewsBySlug = async () => {
    try {
      const request = await axios.get(
        `https://avonazerbaijan.com/xeberler?Slug=${slug}`
      );
      if (request.status === 200) {
        setNewsInfo(request.data);
      } else {
        throw new Error(request.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getNewsBySlug();
  }, []);

  const desc = (data) => {
    return { __html: data };
  };
  return (
    <>
      <Helmet>
        <title>
          {`${newsInfo?.name}`} | AVONAZ.NET – Online kosmetika mağazası
        </title>
      </Helmet>
      <section
        className="section ecommerce-about"
        style={{
          backgroundImage: `url(${profileBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="bg-overlay bg-primary"
          style={{ opacity: "0.85" }}
        ></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="text-center">
                <h1 className="text-white lh-base text-capitalize">
                  Xəbərlər <span>></span> {slug}
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="news_info container pt-4">
        <div className="position-relative w-75">
          <Col>
            <Image
              src={newsInfo?.posterImage}
              className="w-100"
              alt={newsInfo?.name}
              loading="lazy"
              rounded
            />
          </Col>
        </div>
        <h1>{newsInfo?.name}</h1>
        <p dangerouslySetInnerHTML={desc(newsInfo?.content)}></p>
        <p>
          {new Date(newsInfo?.createdAt).toLocaleDateString()}
          <i className="bi bi-calendar"></i>
        </p>
      </div>
    </>
  );
};

export default NewsDetail;
