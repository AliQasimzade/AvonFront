import React from "react";
import { Container, Row, Col, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Shoptopbar } from "../../Components/ShopTopBar";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { CommonService } from "../../Components/CommonService";
import HotDeals from "../../Components/HotDeals";
import { useSelector, useDispatch } from "react-redux";
import DeleteModal from "../../Components/DeleteModal";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { getAllWisslist } from "../../slices/layouts/wistliss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllBaskets } from "../../slices/layouts/basket";
const WishList = () => {
  document.title = "Wishlist | RGAgency - React Frontend";

  const dispatch = useDispatch();
  const wishlistAll = useSelector(
    (state) => state.persistedReducer.Wisslist.wisslist
  );

  const userId = useSelector((state) => state.persistedReducer.User.userId);
  const basket = useSelector((state => state.persistedReducer.Basket.basket));
  const [removeModel, setRemoveModel] = useState(false);
  const [selectedSkuId, setSelectedSkuId] = useState("");
  const desc = (data) => {
    return { __html: data };
  };

  const CloseremoveModal = () => setRemoveModel(false);
  const RemoveModel = (id) => {
    console.log(id);
    setRemoveModel(true);
    setSelectedSkuId(id);
  };

  const deleteData = async () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}WishLists/RemoveWishList?skuId=${selectedSkuId}&appUserId=${userId}`
      )
      .then((res) => {
        console.log(res.data);
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}WishLists/GetAll?appUserId=${userId}`
          )
          .then((res) => {
            console.log(res.data);
            dispatch(getAllWisslist(res.data));
          });
      });
  };

  const addToBasket = async (id) => {
    try {
      const checkBasket = basket.find((item) => item.product.skuId == id);
      if (checkBasket) {
        toast.warn("Bu məhsul artıq səbətdə var");
      } else {
        const request1 = await axios.post(
          `${process.env.REACT_APP_BASE_URL}Baskets/AddBasket?appUserId=${userId}`,
          {
            skuId: id,
            count: 1,
          }
        );
        const request2 = await axios.get(
          `${process.env.REACT_APP_BASE_URL}Baskets/GetAll?appUserId=${userId}`
        );

        const responses = await Promise.all([request1, request2]);
        const data2 = responses[1].data;
        console.log(data2);
        dispatch(getAllBaskets(data2));
        toast.success("Səbətə əlavə olundu");
      }
    } catch (error) {
      toast.error("Sorğuda xəta baş verdi");
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
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
                    {wishlistAll.length > 0 ? (
                      wishlistAll.map((item, inx) => {
                        return (
                          <tr key={inx}>
                            <td>
                              <div className="d-flex gap-3">
                                <div className="avatar-sm flex-shrink-0">
                                  <div className="avatar-title rounded">
                                    <Image
                                      src={item.product.posterImage}
                                      alt=""
                                      className="avatar-xs"
                                    />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <Link to="product-details.html">
                                    <h6 className="fs-16">
                                      {item.product.name}
                                    </h6>
                                  </Link>
                                  <p
                                    className="mb-0 text-muted fs-13"
                                    dangerouslySetInnerHTML={desc(
                                      item.product.description
                                    )}
                                  ></p>
                                </div>
                              </div>
                            </td>
                            <td>${item.product.salePrice}</td>
                            <td>
                              <span>{item.product.stockCount}</span>
                            </td>
                            <td>
                              <ul className="list-unstyled d-flex gap-3 mb-0">
                                <li>
                                  <Button
                                    className="btn btn-soft-info btn-icon btn-sm "
                                    onClick={() =>
                                      addToBasket(item.product.skuId)
                                    }
                                  >
                                    <i className="ri-shopping-cart-2-line fs-13"></i>
                                  </Button>
                                </li>
                                <li>
                                  <Button
                                    className="btn btn-soft-danger btn-icon btn-sm"
                                    onClick={() =>
                                      RemoveModel(item.product.skuId)
                                    }
                                  >
                                    <i className="ri-close-line fs-13"></i>
                                  </Button>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <h1>İstək siyahısında heç bir məlumat yoxdur</h1>
                    )}
                  </tbody>
                </Table>
              </div>
              <DeleteModal
                hideModal={CloseremoveModal}
                removeModel={removeModel}
                deleteData={deleteData}
              />
              <div className="hstack gap-2 justify-content-end mt-2">
                <Link to="/products" className="btn btn-hover btn-secondary">
                  Continue Shopping{" "}
                  <i className="ri-arrow-right-line align-bottom"></i>
                </Link>
                <Link to="/resmilesdirme" className="btn btn-hover btn-primary">
                  Check Out <i className="ri-arrow-right-line align-bottom"></i>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <HotDeals />
      <EmailClothe />
      <CommonService />
    </>
  );
};
export default WishList;
