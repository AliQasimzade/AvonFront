import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmailClothe from "../../Pages/Catalog/EmailClothe";
import { Shoptopbar } from "../../Components/ShopTopBar";
import { CommonService } from "../../Components/CommonService";
import { InvoiceModal } from "../../Components/MainModal";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
const Orderhistory = () => {
  //modal
  const [modal, setModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedInvoice,setSelectedInvoice] = useState('')
  const handleInvoice = (it, invoice) => {
    setModal(true)
    setSelectedInvoice(invoice)
    setSelectedOrder(it)
  };
  const handleClose = () => setModal(false);
  const orders = useSelector(
    (state) => state.persistedReducer.Accont.user.orders
  );
  return (
    <>
      <Helmet>
        <title>Sifariş Tarixiçəsi AVONAZ.NET – Online kosmetika mağazası</title>
      </Helmet>
      <Shoptopbar title="Sifariş tarixçəsi" page="Sifariş tarixçəsi" />
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <div>
                <div className="table-responsive">
                  <Table className="fs-15 align-middle table-nowrap">
                    <thead>
                      <tr>
                        <th scope="col">Sifariş nömrəsi</th>
                        <th scope="col">Məhsul sayı</th>
                        <th scope="col">Sifariş tarixi</th>
                        <th scope="col">Sifariş məbləği</th>
                        <th scope="col">Sifarişin statusu</th>
                        <th scope="col">Sifariş detalları</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(orders || [])?.map((item, inx) => {
                        return (
                          <tr key={inx}>
                            <td>
                                {item?.codePrefix + item?.codeNumber}                      
                            </td>
                            <td>
                                {item?.orderItems.length} məhsul
                            </td>
                            <td>
                              <span className="text-muted">{new Date(item?.createdAt).toLocaleDateString()}</span>
                            </td>
                            <td className="fw-medium">{item?.totalAmount} ₼</td>
                            <td>
                              <span className={`badge bg-${item?.status == "Gözləmədə" ? 'warning' : item?.status == 'Qəbul' ? 'success' : 'danger'}`}>
                                {item?.status}
                              </span>
                              <span> - </span>
                              <span className={`badge bg-${item?.deliveryStatus == "Kuryerde" ? 'warning' : item?.deliveryStatus == 'Catdirildi' ? 'success' : 'danger'}`}>
                                {item?.deliveryStatus}
                              </span>
                            </td>
                            <td>
                              <Link
                                to="#invoiceModal"
                                data-bs-toggle="modal"
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleInvoice(item, item?.codePrefix + item?.codeNumber)}
                              >
                                İnvoysa bax
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
                <div className="text-end">
                  <Link to="/mehsullar" variant="primary" className="btn btn-hover">
                    Alışa davam et{" "}
                    <i className="ri-arrow-right-line align-middle ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
          <InvoiceModal modal={modal} handleClose={handleClose} selectedOrder={selectedOrder} selectedInvoice={selectedInvoice} />
        </Container>
      </section>
    </>
  );
};

export default Orderhistory;
