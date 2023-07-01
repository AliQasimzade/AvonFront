import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/withRouter";
import profileBg from "../../assets/images/profile-bg.jpg";
import { CommonProduct, DefauilOffer } from "../../Components/ProductSilde";
import { CommonService } from "../../Components/CommonService";
import axios from "axios";

import { Helmet } from "react-helmet-async";


const News = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const request = await axios.get(
        `${process.env.REACT_APP_BASE_URL}News/Manage/GetAll?isDeleted=false
        `
      );
      if(request.status === 200) {
        const filterStatus = request.data.filter(r => r.status == true)
        setNews(filterStatus)
      }else {
        throw new Error('Request is failed')
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };


  return (
    <>
    <Helmet>
        <title>Xəbərlər | AVONAZ.NET – Online kosmetika mağazası</title>
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
                <h1
                  className="text-white lh-base text-capitalize"
                  data-key="t-category"
                >
                Xəbərlər
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section pt-0 mt-4">
        {news.length > 0 && <CommonProduct cxxl="4" cmd="6" news={news}/>}
      </section>

      <DefauilOffer />
      <CommonService />
    </>
  );
};

export default withRouter(withTranslation()(News));
