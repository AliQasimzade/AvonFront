import React from "react";
import { Container, Row, Col, Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Shoptopbar } from "../../Components/ShopTopBar";
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
  document.title = "İstək siyahısı | Avon Azərbaycan";

  const dispatch = useDispatch();
  const wishlistAll = useSelector(
    (state) => state.persistedReducer.Wisslist.wisslist
  );

  const userId = useSelector((state) => state.persistedReducer.User.userId);
  const basket = useSelector((state) => state.persistedReducer.Basket.basket);
  const [removeModel, setRemoveModel] = useState(false);
  const [selectedSkuId, setSelectedSkuId] = useState("");
  const desc = (data) => {
    return { __html: data };
  };

  const CloseremoveModal = () => setRemoveModel(false);
  const RemoveModel = (id) => {
    setRemoveModel(true);
    setSelectedSkuId(id);
  };

  const deleteData = async () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}WishLists/RemoveWishList?skuId=${selectedSkuId}&appUserId=${userId}`
      )
      .then((res) => {
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}WishLists/GetAll?appUserId=${userId}`
          )
          .then((res) => {
            dispatch(getAllWisslist(res.data));
          });
      });
  };

  const addToBasket = async (id) => {
    try {
      const checkBasket =
        basket.length > 0
          ? basket.find((item) => item.product.skuId == id)
          : false;
      if (checkBasket) {
        toast.warn("Bu məhsul artıq səbətdə var");
      } else {
        const request1 = await axios.post(
          `${process.env.REACT_APP_BASE_URL}Baskets/AddBasket?appUserId=${userId}`,
          [
            {
              skuId: id,
              count: 1,
            },
          ]
        );
        const request2 = await axios.get(
          `${process.env.REACT_APP_BASE_URL}Baskets/GetAll?appUserId=${userId}`
        );

        const responses = await Promise.all([request1, request2]);
        const data2 = responses[1].data;
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
      <Shoptopbar title="İstək siyahısı" page="İstək siyahısı" />
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="table-responsive">
                {wishlistAll.length > 0 ? (
                  <Table className="fs-15 table-nowrap align-middle">
                    <thead>
                      <tr>
                        <th scope="col">Məhsul</th>
                        <th scope="col">Qiyməti</th>
                        <th scope="col">Düzəliş</th>
                      </tr>
                    </thead>
                    <tbody>
                    {wishlistAll.map((item, inx) => {
                        return (
                          <tr key={inx}>
                            <td>
                              <div className="d-flex gap-3">
                                <div className="avatar-sm flex-shrink-0">
                                  <div className="avatar-title rounded">
                                    <Image
                                      src={item.product.posterImage}
                                      alt=""
                                      style={{objectFit:'cover'}}
                                      className="w-100 h-100"
                                    />
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <Link to={`/mehsul-detallari/${item.slug}`}>
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
                            <td>{item.product.salePrice}₼</td>
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
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <h1 style={{textAlign:'center', marginBottom:'5em'}}>İstək siyahısında heç bir məlumat yoxdur</h1>
                )}
              </div>
              <DeleteModal
                hideModal={CloseremoveModal}
                removeModel={removeModel}
                deleteData={deleteData}
              />
              <div className="hstack gap-2 justify-content-end mt-2">
                <Link to="/mehsullar" className="btn btn-hover btn-secondary">
                  Alışa davam et{" "}
                  <i className="ri-arrow-right-line align-bottom"></i>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default WishList;
