import React, { useState, useEffect } from "react"
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { shopingsCollection } from "../../Common/data";
import { CommonTitle } from "../../Components/Homepage";

const Shoping = () => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);


    const fetchNews = async () => {
        try {
            const response = await fetch("http://avontest0910-001-site1.atempurl.com/api/News/Manage/GetAll?isDeleted=false");
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

    return (
        <>
            <section className="section bg-light bg-opacity-50">
                <Container>
                    <CommonTitle
                        title="Shop insights feeds"
                        dicription="Shopping Insights gives marketers a 360-degree view of a product's popularity. Harnessing search volume data for more than 7,000 popular products (and counting)"
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
                                            <Image src={item.posterImage} className="img-fluid" alt={item.name} />
                                            <Card.Body >
                                                <div className="blog-date bg-body-secondary rounded">
                                                    <h4 className="mb-0">{date.getDay()}</h4>
                                                    <p className="text-muted mt-1">{ayAdi}</p>
                                                </div>
                                                <div className="mt-3">
                                                    <Link to="#"><h5 className="fs-17 lh-base">{item.name}</h5></Link>
                                                    <p className="text-muted fs-15 mt-2">{item.content}</p>
                                                    <Link to="#" className="link-effect link-info">Continue Reading <i className="bi bi-arrow-right ms-2"></i></Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }

                        <div className="mt-4 text-center">
                            <Link to="#" className="btn btn-soft-primary btn-hover">View More Articles <i className="bi bi-arrow-right ms-2"></i></Link>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Shoping;