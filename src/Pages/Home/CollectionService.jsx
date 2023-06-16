import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { CommonService } from "../../Components/CommonService";
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/withRouter";
//img
import featuresimg3 from '../../assets/images/ecommerce/features/img-3.jpg';
import featuresimg1 from '../../assets/images/ecommerce/features/img-1.jpg';
import { CommonTitle } from "../../Components/Homepage";
import axios from "axios";


const Service = (props) => {
    const [slidertwo, setSlidertwo] = useState([]);

    useEffect(() => {
        axios.get('https://ilkin944-001-site1.itempurl.com/api/SliderTwos/Manage/GetAll?page=1&IsMAIN=false').then((response) => {
            setSlidertwo(response.data);
        });
    }, []);
    return (
        <>
            <CommonService />
            <section className="section pt-0">
                <Container>
                    <Row >

                        {
                            slidertwo.map((twoData, index) => {
                                if (index < 4) {
                                    return (
                                        <Col lg={6} className="mt-4" key={twoData.id}>
                                            <Link to={twoData.link} className="product-banner-1 mt-4 mt-lg-0 rounded overflow-hidden position-relative d-block">
                                                <Image src={twoData.image} fluid rounded alt="..." style={{ width: "100%", height: "350px" }} />
                                            </Link>
                                        </Col>
                                    )
                                }

                            })
                        }
                    </Row>
                </Container>
            </section>
            {/* <Container >
                <CommonTitle
                    title={props.t('top-picks-section-title')}
                    dicription={props.t('top-picks-section-desc')}
                />
            </Container> */}
        </ >
    )
}

export default withRouter(withTranslation()(Service));