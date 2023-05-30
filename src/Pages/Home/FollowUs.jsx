import React from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/withRouter";
//img
import Img1 from '../../assets/images/ecommerce/instagram/img-1.jpg';
import Img2 from '../../assets/images/ecommerce/instagram/img-2.jpg';
import Img3 from '../../assets/images/ecommerce/instagram/img-3.jpg';
import Img4 from '../../assets/images/ecommerce/instagram/img-4.jpg';
import Img5 from '../../assets/images/ecommerce/instagram/img-5.jpg';
import Img6 from '../../assets/images/ecommerce/instagram/img-6.jpg';
import { CommonTitle } from "../../Components/Homepage";

export const folloImg = [
    { id: 1, img: Img1 },
    { id: 2, img: Img2 },
    { id: 3, img: Img3 },
    { id: 4, img: Img4 },
    { id: 5, img: Img5 },
    { id: 6, img: Img6 },
]

const FollowUs = (props) => {
    return (
        <>
            <section className="section pb-0">
                <Container>
                    <CommonTitle
                        title={props.t('follow-instagram')}
                        dicription={props.t('follow-instagram-desc')} />
                </Container>

                <div className="position-relative">
                    <Row className="g-0 mt-5">
                        {
                            (folloImg || [])?.map((item, ind) => {
                                return (
                                    <Col key={ind}>
                                        <div className="insta-img">
                                            <Link to="#" className="stretched-link">
                                                <Image src={item.img} alt="" fluid />
                                                <i className="ri-instagram-line"></i>
                                            </Link>
                                        </div>
                                    </Col>
                                )
                            })
                        }

                        <div className="insta-lable text-center">
                            <Link to="#" className="btn btn-primary btn-hover" data-key="t-follow-instagram">
                                <i className="ph-instagram-logo align-middle me-1"></i> {props.t('follow-instagram')}
                            </Link>
                        </div>
                    </Row>
                </div>
            </section>
        </>
    )
}
export default withRouter(withTranslation()(FollowUs));