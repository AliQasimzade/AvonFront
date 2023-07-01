import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/withRouter";
import { CommonTitle } from "../../Components/Homepage";

const Shoping = (props) => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);


    const fetchNews = async () => {
        try {
            const response = await fetch("https://avonazerbaijan.com/api/News/Manage/GetAll?isDeleted=false");
            if (response.ok) {
                const data = await response.json();
                setNews(data);
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const desc = (data) => {
        return { __html: data }
    }
    return (
        <>
            <section className="section bg-light bg-opacity-50">
                <Container>
                    <CommonTitle
                        title={props.t('insights-feeds')}
                        dicription={props.t('insights-feeds-desc')}
                    />
                    <Row className="mt-5">
                        {
                            news.map((item, inx) => {
                                const dateString = item.updatedAt;
                                const date = new Date(dateString)
                                const ay = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"]
                                const ayAdi = ay[date.getMonth()]
                                return (
                                    <Col lg={4} key={inx}>
                                        <Card className="overflow-hidden">
                                            <Image src={item.posterImage} style={{height:'335px', objectFit:'cover'}} className="img-fluid" alt={item.name} />
                                            <Card.Body >
                                                <div className="blog-date bg-body-secondary rounded">
                                                    <h4 className="mb-0">{date.getDay()}</h4>
                                                    <p className="text-muted mt-1">{ayAdi}</p>
                                                </div>
                                                <div className="mt-3">
                                                    <Link to="#"><h5 className="fs-17 lh-base">{item.name}</h5></Link>
                                                    <div className="text-muted fs-15 mt-2" dangerouslySetInnerHTML={desc(item.content)}></div>
                                                    <Link to={`/xeberler/${item.slug}`} className="link-effect link-info">Oxumağa davam edin <i className="bi bi-arrow-right ms-2"></i></Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }

                        <div className="mt-4 text-center">
                            <Link to="/xeberler" className="btn btn-soft-primary btn-hover" data-key="t-view-more-articles">{props.t('view-more-articles')} <i className="bi bi-arrow-right ms-2"></i></Link>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default withRouter(withTranslation()(Shoping));