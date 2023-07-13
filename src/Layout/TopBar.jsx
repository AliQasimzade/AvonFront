import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, Row, Image } from "react-bootstrap";
import { get } from "lodash";
import i18n from "../Common/i18n";
import { languages } from "../Common/data/languages";
import { FaShippingFast } from "react-icons/fa";

const TopBar = () => {
  const [selectlanguage, setSelectlanguage] = useState("");

  const changelanguage = (lan) => {
    i18n.changeLanguage(lan);
    setSelectlanguage(lan);
    localStorage.setItem("I18NLANGUAGE", lan);
  };

  useEffect(() => {
    const currentlanguage = localStorage.getItem("I18NLANGUAGE");
    setSelectlanguage(currentlanguage);
  }, []);

  return (
    <>
      <Container className="px-0" >
        <div className="top-tagbar px-0" >
          <Container fluid >
            <Row className="justify-content-between align-items-center">
              <Col md={6} xs={6}>
                <div className="fs-14 fw-medium">
                  <FaShippingFast style={{ color: "grey" }} />
                  <span style={{ marginLeft: "8px" }}> SÜRƏTLİ ÇATDIRILMA</span>
                </div>
              </Col>
              <Col md={6} xs={6}>
                <div className="d-flex align-items-center justify-content-end gap-3 fs-14">
                  <div className="text-reset fw-normal d-none d-lg-block">
                    <i className="bi bi-telephone-outbound align-middle me-2"></i>{" "}
                    +994 10 722 16 16
                  </div>
                  <hr className="vr d-none d-lg-block" />
                  <Dropdown className="topbar-head-dropdown topbar-tag-dropdown justify-content-end">
                    <Dropdown.Toggle
                      id="language-dropdown"
                      type="button"
                      className="btn btn-icon btn-topbar rounded-circle text-reset fs-14 bg-transparent border-0 arrow-none"
                    >
                      <Image
                        id="header-lang-img"
                        src={get(languages, `${selectlanguage}.icon`)}
                        alt="Header Language"
                        height="16"
                        className="me-2"
                        roundedCircle
                      />{" "}
                      <span id="lang-name">
                        {get(languages, `${selectlanguage}.lable`)}
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end">
                      {Object.keys(languages)?.map((key) => {
                        return (
                          <Dropdown.Item
                            key={key}
                            href="#"
                            className="dropdown-item notify-item language py-2"
                            data-lang={key}
                            title={get(languages, `${key}.title`)}
                            onClick={() => changelanguage(key)}
                          >
                            <Image
                              src={get(languages, `${key}.icon`)}
                              alt=""
                              className="me-2 rounded-circle"
                              height="18"
                            />
                            <span className="align-middle">
                              {get(languages, `${key}.lable`)}
                            </span>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>

    </>
  );
};

export default TopBar;