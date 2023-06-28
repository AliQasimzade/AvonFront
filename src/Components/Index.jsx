import React, { useState, useEffect } from "react";
import CatalogCollection from "../Pages/Catalog/CatalogCollection";
import Filters from "../Pages/Catalog/Filters";
import { getAllProducts } from "../services/getRequests";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
const Index = ({ name, cxxl, clg, cmd, cxl }) => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getProducts = async () => {
    const res = await getAllProducts(currentPage);
    const findDefaults = res
      .map((product) => {
        if (product.isDefault == true) {
          return product;
        }
      })
      .filter(Boolean);
    const allPros = [...products, ...findDefaults];
    setProducts(allPros);
    setCount(Array.from({ length: allPros.length }).fill(0));
  };

  useEffect(() => {
    getProducts();
  }, [currentPage]);
  return (
    <>
      <Helmet>
        <title>Məhsullar | AVONAZ.NET – Online kosmetika mağazası</title>
      </Helmet>
      <Filters name={name} products={products} setProducts={setProducts} />
      {products.length > 0 ? (
        <CatalogCollection
          cxxl={cxxl}
          clg={clg}
          cmd={cmd}
          cxl={cxl}
          count={count}
          setCount={setCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          products={products}
          setProducts={setProducts}
        />
      ) : <Row id="search-result-elem" className="d-flex justify-content-center flex-grow-1">
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
      </Row>}
    </>
  );
};

export default Index;
