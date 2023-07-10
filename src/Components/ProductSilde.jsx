import { Col, Container, Row, Card, Button, Form, Breadcrumb, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Nouislider from "nouislider-react";

//img

import profilebg from '../assets/images/profile-bg.jpg';
import profileBg from "../assets/images/profile-bg.jpg";
import { ProductNoui } from "./Homepage";

export const ProductSide = ({ cid, position, height, fileter, cxxl, isnone }) => {
  
    return (
        <>
            <Row className={cid || ''} style={{ position: position, height: height }}>
                {
                    fileter.length > 0 ? fileter.filter((_, i) => i < 12).map((item, inx) => {
                            return (
                                <Col key={inx} xxl={cxxl || ''} lg={4} md={6} className="element-item seller col-6"  data-category={item.productSubCategories.length > 0 && item.productSubCategories[0]?.subCategory?.name}>
                                    <Card className="overflow-hidden">
                                        <div className={`bg-${item.bg}-subtle rounded-top py-4`}>
                                            <div className="gallery-product" style={{height:'200px', display:'flex', alignItems:'center' }}>
                                                <Image src={item.posterImage} alt="" style={{ maxHeight: 215, maxWidth: "100%" }} className="mx-auto d-block" />
                                            </div>
                                            <div className="product-btn px-3">
                                                <Link to={`/mehsul-detallari/${item.slug}`} className="btn btn-primary btn-sm w-75 add-btn"><i className="mdi mdi-cart me-1"></i> Ətraflı bax</Link>
                                            </div>
                                        </div>
                                        <Card.Body className="card-body">
                                            <div>
                                                <Link to={`/mehsul-detallari/${item.slug}`}>
                                                    <h6 className="fs-15 lh-base text-truncate mb-0">{item.name}</h6>
                                                </Link>
                                                <div className="mt-3">
                                                    {
                                                        item.discountPrice > 0 ? (
                                                            <h5 className="mb-0">{item.discountPrice > 0 ? (item.salePrice - (item.salePrice * item.discountPrice) / 100) : item.salePrice} ₼<span className="text-muted fs-12"><del>{item.salePrice} ₼</del></span></h5>
                                                        ) : (
                                                            <h5 className="mb-0">{item.salePrice} ₼</h5>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                        : (<Row id="search-result-elem">
                            <Col lg={12}>
                                <div className="text-center py-5">
                                    <div className="avatar-lg mx-auto mb-4">
                                        <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                                            <i className="bi bi-search"></i>
                                        </div>
                                    </div>

                                    <h5>Nəticə tapılmadı</h5>
                                </div>
                            </Col>
                        </Row>)
                }
            </Row>

        </>
    )
}

export const ProductGrid = ({ title }) => {
    return (
        <>
            <section className="ecommerce-about" style={{ backgroundImage: `url(${profilebg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="bg-overlay bg-primary" style={{ opacity: "0.85" }}></div>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <div className="text-center">
                                <h1 className="text-white mb-0"> {title}</h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export const ProductSelector = ({ handleratting, handledicount, handlecategory }) => {
    return (
        <>
            <Row >
                <Col lg={12} >
                    <Card >
                        <Card.Body className="p-4">
                            <Row className="gy-4">
                                <Col xl={3} md={6}>
                                    <div>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select aria-label="Category" onChange={(e) => handlecategory(e.target)}>
                                            <option>Select Category</option>
                                            <option value="Appliances">Appliances</option>
                                            <option value="Automotive Accessories">Automotive Accessories</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Furniture">Furniture</option>
                                            <option value="Grocery">Grocery</option>
                                            <option value="Kids">Kids</option>
                                            <option value="Watches">Watches</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col xl={3} md={6}>
                                    <div>
                                        <Form.Label>Price</Form.Label>
                                        <div className="pb-3">
                                            <div id="slider-hide" data-slider-color="info" className="mb-4 noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr">
                                                <Nouislider
                                                    range={{ min: 0, max: 2000 }}
                                                    start={[0, 2000]}
                                                    connect
                                                    // onSlide={onUpdate}
                                                    data-slider-color="info"
                                                    id="product-price-range"
                                                />
                                                <ProductNoui />
                                            </div>
                                            <div className="formCost d-none gap-2 align-items-center">
                                                <Form.Control className="form-control-sm" type="text" id="minCost" defaultValue="0" />
                                                <span className="fw-semibold text-muted">to</span>
                                                <Form.Control className="form-control-sm" type="text" id="maxCost" defaultValue="1000" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                <Col xl={3} md={6}>
                                    <div>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Select aria-label="Select rating" onChange={(e) => handleratting(e.target)}>
                                            <option>Select rating</option>
                                            <option value="1">1</option>
                                            <option value="2">2 Above</option>
                                            <option value="3">3 Above</option>
                                            <option value="4">4 Above</option>
                                        </Form.Select>
                                    </div>
                                </Col>

                                <Col xl={3} md={6}>
                                    <div>
                                        <Form.Label >Endirimi</Form.Label>
                                        <Form.Select aria-label="Discount" onChange={(e) => handledicount(e.target)}>
                                            <option value="10">10% və ya daha çox</option>
                                            <option value="20">20% və ya daha çox</option>
                                            <option value="30">30% və ya daha çox</option>
                                            <option value="40">40% və ya daha çox</option>
                                            <option value="45">50% və ya daha çox</option>
                                        </Form.Select>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </ >
    )
}

export const Selectores = ({ setSelect, searchProducts }) => {
    return (
        <Row className="align-items-center mb-4">
            <Col className="col-md-auto">
                <div className="search-box">
                    <Form.Control id="searchProductList" autoComplete="off" placeholder="Məhsul axtarın..." onChange={(e) => searchProducts(e)} />
                    <i className="ri-search-line search-icon"></i>
                </div>
            </Col>
            <Col className="col-md">
                <div className="d-flex gap-2 justify-content-md-end">
                    <div className="flex-shrink-0">
                        <Form.Label htmlFor="sort-elem" className="col-form-label">Sort By:</Form.Label>
                    </div>
                    <div className="flex-shrink-0">
                        <Form.Select className="w-md" id="sort-elem" onClick={(e) => setSelect(e.target)}>
                            <option value="all">All</option>
                            <option value="lowtohigh">Low to High</option>
                            <option value="hightolow">High to Low</option>
                        </Form.Select>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export const CommonProduct = ({ cxxl, clg, cmd,news = null }) => {
    const desc = (data) => {
        return { __html: data };
      };
    if(news == null)  return (
        <Container fluid>
        <Row className="g-3">
            <Col xxl={cxxl || ''} lg={clg || ''} md={cmd || ''}>
                <div className="product-banner-1 mt-3 mt-lg-0 rounded overflow-hidden">
                    <div className="bg-overlay blue"></div>
                    <div className="product-content p-4">
                        <p className="text-uppercase fw-semibold text-white mb-2">Up to 50-70%</p>
                        <h1 className="text-white lh-base ff-secondary display-6 display-xl-5"> Women's Sportwere Sales</h1>
                        <div className="product-btn mt-3 mt-xl-4">
                            <Link to="#" className="link-effect link-light fs-14">Shop Now <i className="bi bi-arrow-right ms-2"></i></Link>
                        </div>
                    </div>
                </div>
            </Col>
            <Col xxl={cxxl || ''} lg={clg || ''} md={cmd || ''}>
                <div className="product-banner-1 mt-4 mt-lg-0 rounded overflow-hidden right">
                    <div className="bg-overlay"></div>
                    <div className="product-content p-4 text-end">
                        <p className="text-uppercase text-white fw-semibold mb-2">MEGA SALE</p>
                        <h1 className="text-white lh-base ff-secondary display-6 display-xl-5">Running Shoes Sales Up to 50%</h1>
                        <div className="product-btn mt-3 mt-xl-4">
                            <Link to="#" className="link-effect link-light fs-14">Shop Now <i className="bi bi-arrow-right ms-2"></i></Link>
                        </div>
                    </div>
                </div>
            </Col>
            <Col xxl={cxxl || ''} lg={clg || ''} md={cmd || ''}>
                <div className="product-banner-1 mt-4 mt-lg-0 rounded overflow-hidden">
                    <div className="product-content p-4">
                        <p className="text-uppercase fw-semibold text-dark mb-2">Summer Sales</p>
                        <h1 className="lh-base ff-secondary display-6 display-xl-5">Trendy Fashion Clothes</h1>
                        <div className="product-btn mt-3 mt-xl-4">
                            <Link to='/mehsullar' className="link-effect link-primary fs-14">Shop Now <i className="bi bi-arrow-right ms-2"></i></Link>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
    )
    else return <Container fluid>
        <Row className="g-3">
      {news.map((n, index) => (
          <Col key={index} xxl={cxxl || ''} lg={clg || ''} md={cmd || ''}>
          <div className="product-banner-1 mt-3 mt-lg-0 rounded overflow-hidden">
              <Image src={n.posterImage} alt={n.name} fluid rounded />
              <div className="bg-overlay blue"></div>
              <div className="product-content p-4">
                  <p className="text-uppercase fw-semibold text-white mb-2">{n.name}</p>
                  <div className="text-white" dangerouslySetInnerHTML={desc(n.content)}></div>
                  <div><p className="text-white">{new Date(n.createdAt).toLocaleDateString()}</p></div>
                  <div className="product-btn mt-3 mt-xl-4">
                      <Link to={`/xeberler/${n.slug}`} className="link-effect link-light fs-14">Oxumağa davam edin <i className="bi bi-arrow-right ms-2"></i></Link>
                  </div>
              </div>
          </div>
      </Col>
      ))}
        </Row>
    </Container>
}

export const DefauilOffer = () => {
    return (
        <section className="section" style={{ backgroundImage: `url(${profileBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="bg-overlay bg-primary" style={{ opacity: "0.85" }}></div>
            <Container >
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <div className="text-center">
                            <h1 className="text-white lh-base text-capitalize">Xüsusi təklifləri qaçırma</h1>
                            <p className="text-white-75 fs-15 mb-4 pb-2">Xəbər büliteninə abunə olmaqla daim yeniliklərdən xəbərdar olun</p>
                            <Form action="#">
                                <div className="position-relative ecommerce-subscript">
                                    <Form.Control type="email" className="rounded-pill border-0" placeholder="E-poçtunuzu daxil edin" />
                                    <Button type="submit" className="btn btn-darken-primary rounded-pill">Üzv ol</Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export const PublishedProduct = ({ title, dicription }) => {
    return (
        <>
            <section className="term-condition bg-primary">
                <Container >
                    <Row className="justify-content-center">
                        <Col lg={6}>
                            <div className="text-center">
                                <h1 className="text-white mb-2">{title}</h1>
                                <p className="text-white-75 mb-0">{dicription}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <div className="position-relative">
                <div className="svg-shape">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="1440" height="120" preserveAspectRatio="none" viewBox="0 0 1440 120">
                        <g mask="url(&quot;#SvgjsMask1039&quot;)" fill="none">
                            <rect width="1440" height="120" x="0" y="0" fill="var(--tb-primary)"></rect>
                            <path d="M 0,85 C 288,68.8 1152,20.2 1440,4L1440 120L0 120z" fill="var(--tb-body-bg)"></path>
                        </g>
                        <defs>
                            <mask id="SvgjsMask1039">
                                <rect width="1440" height="120" fill="#ffffff"></rect>
                            </mask>
                        </defs>
                    </svg>
                </div>
            </div>
        </>
    )
}