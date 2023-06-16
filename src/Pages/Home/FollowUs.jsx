import React , {useState,  useEffect}from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/withRouter";
import axios from "axios";
import { CommonTitle } from "../../Components/Homepage";



const FollowUs = (props) => {
    const [slider, setSlider] = useState([]);
    useEffect(() => {
        axios.get("https://ilkin944-001-site1.itempurl.com/api/SliderTwos/Manage/GetAll?isDeleted=false&IsMAIN=false").then((data) => {
            setSlider(data.data)
           console.log(slider);
        });
    }, []);

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
                            (slider || [])?.map((item, ind) => {
                                return (
                                    <Col key={ind}>
                                        <div className="insta-img">
                                            <Link to={item.link} className="stretched-link">
                                                <Image src={item.image} alt="" fluid />
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