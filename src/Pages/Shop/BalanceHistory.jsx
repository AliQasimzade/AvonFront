import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Shoptopbar } from "../../Components/ShopTopBar";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import axios from 'axios'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs'

const timeZone = (d) => {
  const date = new Date(d);

  const second = String(date.getSeconds()).padStart(2,'0')
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  const formattedDate = `${hours}:${minutes}:${second} ${day}-${month}-${year}`;

  return formattedDate;
}

const BalanceHistory = () => {
  //modal
  const uid = useSelector(
    (state) => state.persistedReducer.User.userId
  );

  const [history, setHistory] = useState([]);

  const getBalanceHistory = async () => {
    try {
      if (uid) {
        const req = await axios.get(`https://avonazerbaijan.com/api/Account/BalanceHistory?Id=${uid}`);
        setHistory(req.data)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBalanceHistory();
  }, [])
  return (
    <>
      <Helmet>
        <title>Balans Tarixiçəsi AVONAZ.NET – Online kosmetika mağazası</title>
      </Helmet>
      <Shoptopbar title="Balans tarixçəsi" page="Balans tarixçəsi" />
      <section className="section">
        <Container>
          <Row>
            <Col lg={12}>
              <div>
                <div className="table-responsive">
                  <Table className="fs-15 align-middle table-nowrap">
                    <thead>
                      <tr>
                        <th scope="col">Yaranma tarix</th>
                        <th scope="col">Dəyişmə tarix</th>
                        <th scope="col">Balansdakı məbləğ</th>
                        <th scope="col">Öncəki məbləğ</th>
                        <th scope="col">Açıqlama</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(history || [])?.map((item, inx) => {
                        return (
                          <tr key={inx}>
                            <td>
                              {timeZone(item?.createdAt)}
                            </td>
                            <td>
                              {timeZone(item?.changedTime)}
                            </td>
                            <td className="fw-medium">{item?.newBalance} ₼</td>
                            <td className="fw-medium">{item?.oldBalance} ₼</td>
                            <td className="fw-medium">{item?.description}</td>
                            <td>
                              {item.newBalance > item.oldBalance 
                              ? <BsFillArrowUpCircleFill size={32} color="green"/> 
                              : <BsFillArrowDownCircleFill size={32} color="red" />}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BalanceHistory;
