import { Link } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import { Form, Row, Col, Card, Button, Image } from "react-bootstrap";
import "./Catalog.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

const CatalogCollection = ({ cxxl, cxl, clg, cmd, cheight }) => {
  //select
  const [select, setSelect] = useState("all");
  const [selectItem, setSelectItem] = useState([]);
  const [count, setCount] = useState([]);
  console.log(count);
  console.log(selectItem);
  const pagination = true;
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentpages, setCurrentpages] = useState([]);
  const [searchFilterProducts, setSearchFilterProducts] = useState([]);
  const userId = useSelector((state) => state.persistedReducer.User.userId);
  console.log(userId);
  const perPageData = 9;
  const handlePageClick = (event) => {
    const newOffset = (event.selected * perPageData) % currentpages.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    axios
      .get(
        `http://avontest0910-001-site1.dtempurl.com/api/Products/GetAll?count=30&isDelete=false`
      )
      .then((res) => {
        const findDefaults = res.data
          .map((product) => {
            if (product.isDefault == true) {
              return product;
            }
          })
          .filter(Boolean);
        setCurrentpages(findDefaults);
        setSearchFilterProducts(res.data);
        setCount(Array.from({ length: findDefaults.length }).fill(0));
        console.log(res.data[0].productImages);
      });
  }, []);
  const pageNumbers = [];

  const endOffset = itemOffset + perPageData;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = currentpages.slice(itemOffset, endOffset);
  console.log(currentItems);
  const pageCount = Math.ceil(currentpages.length / perPageData);
  useEffect(() => {
    if (pageNumbers.length && pageNumbers.length < currentPage) {
      setCurrentPage(pageNumbers.length);
    }
  }, [currentPage, pageNumbers.length]);

  //select value
  const selectValue = (value) => {
    setSelect(value);
    setSearchFilterProducts(
      setCurrentpages.filter((product) => {
        if (product.name.toLowerCase().includes(value.toLowerCase())) {
          return product;
        }
      })
    );
  };

  const handleSKUChange = (a) => {
    setSelectItem(a);
  };
  const addToCart = async (skuId, appUserId) => {
    console.log(skuId);

    try {
      const response = await axios.post(
        `http://avontest0910-001-site1.dtempurl.com/api/Baskets/AddBasket?skuId=${skuId}&appUserId=${appUserId}`,
        {
          skuId: selectItem,
          appUserId: userId,
        }
      );
      console.log(response);
    } catch (error) {}
  };

  return (
    <>
      <div className="flex-grow-1">
        <div className="d-flex align-items-center gap-2 mb-4">
          <p className="text-muted flex-grow-1 mb-0">
            <span>{currentpages.length}</span> results
          </p>

          <div className="flex-shrink-0">
            <div className="d-flex gap-2">
              <div className="flex-shrink-0">
                <Form.Label htmlFor="sort-elem" className="col-form-label">
                  Sort By:
                </Form.Label>
              </div>
              <div className="flex-shrink-0">
                <Form.Select
                  className="form-select w-md"
                  id="sort-elem"
                  onChange={(e) => selectValue(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="lowtohigh">Low to High</option>
                  <option value="hightolow">High to Low</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
        <Row id="product-grid">
          {select &&
            (currentItems && currentItems.length > 0 ? (
              (currentItems || [])?.map((item, i) => {
                console.log(item);
                return (
                  !cxl && (
                    <Col key={item.id} xxl={cxxl} lg={clg} md={cmd}>
                      <Card className="ecommerce-product-widgets border-0 rounded-0 shadow-none overflow-hidden">
                        <div className="bg-light bg-opacity-50 rounded py-4 position-relative">
                          <Image
                            src={item.productImages[0]?.image}
                            alt=""
                            style={{
                              maxHeight: `${cheight || ""}`,
                              maxWidth: "100%",
                            }}
                            className="mx-auto d-block rounded-2"
                          />
                          <div className="action vstack gap-2">
                            <Button
                              color="danger"
                              className="avatar-xs p-0 btn-soft-warning custom-toggle product-action"
                              data-bs-toggle="button"
                            >
                              <span className="icon-on">
                                <i className="ri-heart-line"></i>
                              </span>
                              <span className="icon-off">
                                <i className="ri-heart-fill"></i>
                              </span>
                            </Button>
                          </div>
                          {item?.relationOfBaseCode[count[i]] && (
                            <div className="avatar-xs label">
                              <div className="avatar-title bg-danger rounded-circle fs-11">
                                {
                                  item?.relationOfBaseCode[count[i]]
                                    .discountPrice
                                }
                                %
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="pt-4">
                          <div>
                            {item.variant.type == "color" ? (
                              item.relationOfBaseCode.length > 0 ? (
                                <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                                  {item.relationOfBaseCode.map(
                                    (color, index) => (
                                      <li key={index}>
                                        <Form.Control
                                          type="radio"
                                          name="sizes1"
                                          id={`product-color-${color.skuId}`}
                                          onClick={() => {
                                            handleSKUChange(color.skuId);
                                            setCount((count) =>
                                              count.map((c, idx) => {
                                                if (idx == i) {
                                                  c = index;
                                                }
                                                return c;
                                              })
                                            );
                                          }}
                                        />
                                        <Form.Label
                                          className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                          htmlFor={`product-color-${color.skuId}`}
                                          style={{
                                            backgroundColor: `${color.colorCode}`,
                                          }}
                                        >
                                          {color.colorCode == null && (
                                            <FaCheck />
                                          )}
                                        </Form.Label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              ) : (
                                <div className="avatar-xxs mb-3">
                                  <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                                    <AiFillExclamationCircle />
                                  </div>
                                </div>
                              )
                            ) : item.variant.type == "file" ? (
                              item.relationOfBaseCode.length > 0 ? (
                                <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                                  {item.relationOfBaseCode.map(
                                    (color, index) => (
                                      <li key={color.skuId}>
                                        <Form.Control
                                          type="radio"
                                          name="sizes1"
                                          id={`product-color-${color.skuId}`}
                                          onClick={() => {
                                            handleSKUChange(color.skuId);
                                            setCount((count) =>
                                              count.map((c, idx) => {
                                                if (idx == i) {
                                                  c = index;
                                                }
                                                return c;
                                              })
                                            );
                                          }}
                                        />
                                        <Form.Label
                                          className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                          htmlFor={`product-color-${color.skuId}`}
                                          style={{
                                            backgroundImage: `url(${color.colorCode})`,
                                          }}
                                        >
                                          {color.colorCode == null && (
                                            <FaCheck />
                                          )}
                                        </Form.Label>
                                      </li>
                                    )
                                  )}
                                </ul>
                              ) : (
                                <div className="avatar-xxs mb-3">
                                  <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                                    <AiFillExclamationCircle />
                                  </div>
                                </div>
                              )
                            ) : item.variant.type == "size" ? (
                              item.relationOfBaseCode.length > 0 ? (
                                <ul className="clothe-colors list-unstyled hstack gap-1 mb-3 flex-wrap">
                                  {item.relationOfBaseCode.map((color) => (
                                    <li key={color.id}>
                                      <Form.Control
                                        type="radio"
                                        name="sizes1"
                                        id={`product-color-${color.id}`}
                                        onClick={() => {
                                          setSelectItem(color.skuId);
                                        }}
                                      />
                                      <Form.Label
                                        className={`avatar-xxs btn p-0 d-flex align-items-center justify-content-center rounded-circle `}
                                        htmlFor="product-color-12"
                                      >
                                        {color.variable}
                                      </Form.Label>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="avatar-xxs mb-3">
                                  <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                                    <AiFillExclamationCircle />
                                  </div>
                                </div>
                              )
                            ) : (
                              <div className="avatar-xxs mb-3">
                                <div className="avatar-title bg-light text-muted rounded cursor-pointer">
                                  <AiFillExclamationCircle />
                                </div>
                              </div>
                            )}

                            <Link to={`/product-details/${item.skuId}`}>
                              <h6 className="text-capitalize fs-15 lh-base text-truncate mb-0">
                                {item?.name}
                              </h6>
                            </Link>
                            <div className="mt-2">
                              {item.relationOfBaseCode[count[i]].comments
                                .length > 0 ? (
                                <span className="float-end">
                                  {Number(
                                    item.relationOfBaseCode[count[i]].comments
                                      .map((retinhg) => retinhg.star)
                                      .reduce((acc, item) => acc + item, 0) /
                                      item.relationOfBaseCode[count[i]].comments
                                        .length
                                  ).toFixed(2)}
                                  :
                                  <i className="ri-star-half-fill text-warning align-bottom"></i>
                                </span>
                              ) : (
                                <span className="float-end">
                                  retingi yoxdur
                                  <i className="ri-star-half-fill text-warning align-bottom"></i>
                                </span>
                              )}

                              {item?.relationOfBaseCode[count[i]]
                                .discountPrice > 0 ? (
                                <>
                                  <h5 className="text-secondary mb-0">
                                    {Number(
                                      item?.relationOfBaseCode[count[i]]
                                        .salePrice -
                                        (item?.relationOfBaseCode[count[i]]
                                          .salePrice /
                                          100) *
                                          item?.relationOfBaseCode[count[i]]
                                            .discountPrice
                                    ).toFixed(2)}
                                    <span className="text-muted fs-12">
                                      <del>
                                        {
                                          item?.relationOfBaseCode[count[i]]
                                            .salePrice
                                        }
                                      </del>
                                    </span>
                                  </h5>
                                </>
                              ) : (
                                <h5 className="text-secondary mb-0">
                                  {item?.relationOfBaseCode[count[i]].salePrice}
                                </h5>
                              )}
                            </div>
                            <div className="tn mt-3">
                              <Link
                                className="btn btn-primary btn-hover w-100 add-btn"
                                onClick={() =>
                                  addToCart(
                                    item.relationOfBaseCode[count[i]].skuId
                                  )
                                }
                              >
                                <i className="mdi mdi-cart me-1"></i> Add To
                                Cart
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  )
                );
              })
            ) : (
              <>
                <Row id="search-result-elem">
                  <Col lg={12}>
                    <div className="text-center py-5">
                      <div className="avatar-lg mx-auto mb-4">
                        <div className="avatar-title bg-primary-subtle text-primary rounded-circle fs-24">
                          <i className="bi bi-search"></i>
                        </div>
                      </div>

                      <h5>No matching records found</h5>
                    </div>
                  </Col>
                </Row>
              </>
            ))}
        </Row>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default CatalogCollection;
