import React from "react";
import { Container, Row, Col, Table,Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Shoptopbar } from "../../Components/ShopTopBar";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { CommonService } from "../../Components/CommonService";
import HotDeals from "../../Components/HotDeals";
import { useSelector } from "react-redux";
const WishList = () => {
    document.title = "Wishlist | RGAgency - React Frontend";
    const wishlistAll = useSelector(state => state.persistedReducer.Wisslist.wisslist);

    const desc = (data) => {
        return {__html:data}
    }
    return (
        <>
            <Shoptopbar title="Wishlist" page="Wishlist" />
            <section className="section">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="table-responsive">
                                <Table className="fs-15 table-nowrap align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Stock Count</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            wishlistAll.length > 0 ? wishlistAll.map((item, inx) => {
                                                return (
                                                    <tr key={inx}>
                                                        <td>
                                                            <div className="d-flex gap-3">
                                                                <div className="avatar-sm flex-shrink-0">
                                                                    <div className="avatar-title rounded">
                                                                        <Image src={item.product.posterImage} alt="" className="avatar-xs" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <Link to="product-details.html"><h6 className="fs-16">{item.product.name}</h6></Link>
                                                                    <p className="mb-0 text-muted fs-13" dangerouslySetInnerHTML={desc(item.product.description)}></p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>${item.product.salePrice}</td>
                                                        <td><span>{item.product.stockCount}</span></td>
                                                        <td>
                                                            <ul className="list-unstyled d-flex gap-3 mb-0">
                                                                <li>
                                                                    <Link to='/shop/shopingcard' className="btn btn-soft-info btn-icon btn-sm"><i className="ri-shopping-cart-2-line fs-13"></i></Link>
                                                                </li>
                                                                <li>
                                                                    <Link to="#" className="btn btn-soft-danger btn-icon btn-sm"><i className="ri-close-line fs-13"></i></Link>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                       :<h1>İstək siyahısında heç bir məlumat yoxdur</h1> }
                                    </tbody>
                                </Table>
                            </div>
                            <div className="hstack gap-2 justify-content-end mt-2">
                                <Link to="/products" className="btn btn-hover btn-secondary">Continue Shopping <i className="ri-arrow-right-line align-bottom"></i></Link>
                                <Link to='/shop/checkout' className="btn btn-hover btn-primary">Check Out <i className="ri-arrow-right-line align-bottom"></i></Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <HotDeals />
            <EmailClothe />
            <CommonService />
        </>
    )
}
export default WishList;