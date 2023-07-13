import React, { useState, useEffect } from "react";
import Nouislider from "nouislider-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Collapse, Button, Card, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const Filters = ({ name, products, setProducts, slug, setCount }) => {
  const [mincost, setMincost] = useState(0);
  const [maxcost, setMaxcost] = useState(0);
  const pathname = useLocation();
  const [subCats, setSubCats] = useState([]);
  const subs = useSelector((state) => state.persistedReducer.Subcategories);
  
  const [changeInput, setChangeInput] = useState("");
  const [discount, setDiscount] = useState(false);
  const [brand, setBrand] = useState(
    pathname.pathname.includes("brendler") ? true : false
  );

  const [discounts, setDiscounts] = useState([50, 40, 30, 20, 10]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedSubs, setSelectedSubs] = useState([]);

  const getBrands = async () => {
    try {
      const req = await axios.get(
        `https://avonazerbaijan.com/api/Brands/GetAll`
      );
      setBrands(req.data);
    } catch (error) { }
  };

  const [parentCat, setParentCat] = useState([]);
  
  const getParentCategory = async () => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_BASE_URL}Categories/ustkateqoriyalar?slug=${pathname.pathname.split("/")[2]}`
      )
      const res = await req.data;
      setParentCat(res)
    } catch (error) {
      console.error(error);
    }
  }

  const getAllCategories = async () => {
    try {
      const request = await axios.get(
        `${process.env.REACT_APP_BASE_URL}Categories/GetAll`
      );
      const res = await request.data;
      console.log(res);
      const findBySlugSubCat = parentCat.subCategories.find((su) => su.slug == slug);
      console.log(parentCat);
      if (findBySlugSubCat) {
        setSubCats([...parentCat.subCategories]);
      } else {
        console.log("Belə bir alt kateqoriya yoxdur !");
      }
    } catch (error) {
      console.log(error);
      toast.error("Sorğuda xəta baş verdi");
    }
  };
  console.log(subCats);
  useEffect(() => {
    if (pathname.pathname.includes("kateqoriyalar")) {
      getAllCategories();
      getParentCategory();
    } else {
      getBrands();
      setSubCats([...subs]);
    }
  }, []);
  const searchProducts = async () => {
    try {
      const queryParams = {
        minValue: mincost != 0 ? mincost : null,
        maxValue: maxcost != 0 ? maxcost : null,
        disCount: selectedDiscount != "" ? selectedDiscount : null,
        searchWord: changeInput != "" ? changeInput : null,
        BrandId: selectedBrand != "" ? selectedBrand : null,
      };
      const req = await axios.get(
        `${process.env.REACT_APP_BASE_URL}Products/GetAll?page=1&count=30&isDelete=false`,
        {
          params: queryParams,
          headers: {
            subCategoryIds:
              selectedSubs.length > 0 ? selectedSubs.join(",") : null,
          },
        }
      );

      const findDefaults = req.data
        .map((product) => {
          if (product.isDefault == true) {
            return product;
          }
        })
        .filter(Boolean);
      setProducts(findDefaults);
      setCount(Array.from({ length: findDefaults.length }).fill(0));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
      <div className={`${name}`}>
        <Card className="overflow-hidden">
          <Card.Header>
            <div className="d-flex mb-3">
              <div className="flex-grow-1">
                <h5 className="fs-16">Filterlə</h5>
              </div>
              <div className="flex-shrink-0">
                <Button className="p-2" id="clearall" onClick={searchProducts}>
                  Axtar
                </Button>
              </div>
            </div>
            {pathname.pathname.includes("brendler") == false &&
              pathname.pathname.includes("kateqoriyalar") == false && (
                <div className="search-box">
                  <Form.Control
                    className=""
                    id="searchProductList"
                    autoComplete="off"
                    placeholder="Məhsul axtar..."
                    onChange={(e) => setChangeInput(e.target.value)}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
              )}
          </Card.Header>
          <div className="accordion accordion-flush filter-accordion">
            {pathname.pathname.includes("brendler") == false && (
              <Card.Body className="border-bottom">
                <div>
                  <p className="text-muted text-uppercase fs-12 fw-medium mb-3">
                    Kateqoriyalar
                  </p>
                  <ul className="list-unstyled mb-0 filter-list">
                    {subCats.length > 0 &&
                      subCats.map((cat, index) => {
                        return (
                          <li key={cat.id}>
                            <div
                              className="form-check d-flex"
                              onClick={(e) => {
                                if (
                                  selectedSubs.find((s) => s == cat.id) !=
                                  undefined
                                ) {
                                  setSelectedSubs(
                                    selectedSubs.filter((s) => s != cat.id)
                                  );
                                  e.target.checked = false;
                                } else {
                                  setSelectedSubs((selectedSubs) => [
                                    ...selectedSubs,
                                    cat.id,
                                  ]);
                                  e.target.checked = true;
                                }
                              }}
                            >
                              <Form.Check
                                type="radio"
                                id={`sub${index}`}
                              />
                              <Form.Label
                                htmlFor={`sub${index}`}
                                className="d-flex align-items-center"
                              >
                                <div className="flex-grow-1">
                                  <h5 className="fs-13 mb-0 listname">
                                    {cat.name}
                                  </h5>
                                </div>
                                <div className="flex-shrink-0 ms-2">
                                  <span className="badge bg-light text-muted">
                                    {
                                      subs.find((su) => su.name == cat.name)
                                        ?.productSubCategories.length
                                    }
                                  </span>
                                </div>
                              </Form.Label>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </Card.Body>
            )}

            <Card.Body className="border-bottom">
              <p className="text-muted text-uppercase fs-12 fw-medium mb-4">
                Qiymət aralığı
              </p>
              <Nouislider
                range={{ min: 0, max: 10000 }}
                start={[mincost, maxcost]}
                connect
                data-slider-color="info"
                id="product-price-range"
              />
              <div className="formCost d-flex gap-2 align-items-center mt-3">
                <Form.Control
                  className="form-control-sm"
                  id="MinCost"
                  value={mincost}
                  onChange={(e) => setMincost(Number(e.target.value))}
                />
                <span className="fw-semibold text-muted">-</span>
                <Form.Control
                  className=" form-control-sm"
                  type="text"
                  id="maxCost"
                  value={maxcost}
                  onChange={(e) => setMaxcost(Number(e.target.value))}
                />
              </div>
            </Card.Body>
            {pathname.pathname.includes("brendler") == false &&
              pathname.pathname.includes("kateqoriyalar") == false && (
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingDiscount">
                    <Button
                      onClick={() => setDiscount(!discount)}
                      aria-controls="flush-collapseDiscount"
                      aria-expanded={discount}
                      className="accordion-button bg-transparent shadow-none"
                    >
                      <span className="text-muted text-uppercase fs-12 fw-medium">
                        Endirim miqdarı
                      </span>
                      <span className="badge bg-success rounded-pill align-middle ms-1 filter-badge"></span>
                    </Button>
                  </h2>
                  <Collapse in={discount}>
                    <div id="flush-collapseDiscount">
                      <div
                        className="accordion-collapse collapse show"
                        aria-labelledby="flush-headingDiscount"
                      >
                        <div className="accordion-body text-body pt-1">
                          <div
                            className="d-flex flex-column gap-2 filter-check"
                            id="discount-filter"
                          >
                            {discounts.map((disc, index) => (
                              <div
                                className="form-check"
                                key={index}
                                onClick={() => setSelectedDiscount(disc)}
                              >
                                <Form.Check
                                  type="radio"
                                  value={disc}
                                  name="discount_check"
                                  id="productdiscountRadio6"
                                />
                                <Form.Label
                                  className="form-check-label"
                                  htmlFor="discount_check"
                                >
                                  {disc}%{" "}
                                  {disc == 10 ? "-dən az" : "və ya üzəri"}
                                </Form.Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              )}
            {pathname.pathname.includes("kateqoriyalar") == false && (
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingDiscount">
                  <Button
                    onClick={() => setBrand(!brand)}
                    aria-controls="flush-collapseDiscount"
                    aria-expanded={brand}
                    className="accordion-button bg-transparent shadow-none"
                  >
                    <span className="text-muted text-uppercase fs-12 fw-medium">
                      Brendlər
                    </span>
                    <span className="badge bg-success rounded-pill align-middle ms-1 filter-badge"></span>
                  </Button>
                </h2>
                <Collapse in={brand}>
                  <div id="flush-collapseDiscount">
                    <div
                      className="accordion-collapse collapse show"
                      aria-labelledby="flush-headingDiscount"
                    >
                      <div className="accordion-body text-body pt-1">
                        <div
                          className="d-flex flex-column gap-2 filter-check"
                          id="discount-filter"
                        >
                          {brands.length > 0 &&
                            brands.map((disc, index) => {
                              return (
                                <div
                                  className="form-check"
                                  key={index}
                                  onClick={(e) => {
                                    if (selectedBrand == disc.id) {
                                      setSelectedBrand("");
                                      e.target.checked = false;
                                    } else {
                                      setSelectedBrand(disc.id);
                                      e.target.checked = true;
                                    }
                                  }}
                                >
                                  <Form.Check
                                    type="radio"
                                    value={disc}
                                    name="discount_check"
                                    id="productdiscountRadio6"
                                  />

                                  <Form.Label
                                    className="form-check-label"
                                    htmlFor="discount_check"
                                  >
                                    {disc.name}
                                  </Form.Label>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Filters;
