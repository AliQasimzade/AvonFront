import React, { useState, useEffect } from "react";
import CatalogCollection from "./CatalogCollection";
import Filters from "./Filters";
import { Row, Col,Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useParams,useLocation } from "react-router-dom";
const Clothing = () => {
const {pathname} = useLocation()
  const name = "sidebar small-sidebar flex-shrink-0"
  const cxxl="3"
  const  clg="4"
  const cmd="6"
  const cheight="200px"
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const {slug} = useParams()
  const getBrandsProducts = async () => {
    try {
      const req = await axios.get(`https://avonazerbaijan.com/Brendler?slug=${slug}`);
      if(req.status === 200) {
        setProducts(req.data.products);
        setCount(Array.from({ length: req.data.length }).fill(0))
      }else {
        throw new Error("Request is faield !")
      }
    } catch (error) {
      console.log(error.message)
    }
  };


  const getCatProducts = async () => {
    try {
      const req = await axios.get(`https://avonazerbaijan.com/kateqoriyalar?slug=${slug}`);
      if(req.status === 200) {
        console.log(req.data);
        setProducts(req.data.productSubCategories.map(p => p.product));
        setCount(Array.from({ length: req.data.length }).fill(0))
      }else {
        throw new Error("Request is faield !")
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
   if(pathname.includes('brendler')) {
    getBrandsProducts();
   }else {
    getCatProducts()
   }
  }, [currentPage,slug]);
  return (
    <Container >
      <Helmet>
        <title>Məhsullar | AVONAZ.NET – Online kosmetika mağazası</title>
      </Helmet>
      <div className="ecommerce-product gap-4">
      <Filters name={name} products={products} setProducts={setProducts} slug={slug} setCount={setCount}/>
      {products.length > 0 ? (
        <CatalogCollection
        cxxl={cxxl}
        clg={clg}
        cmd={cmd}
          count={count}
          setCount={setCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          products={products}
          setProducts={setProducts}
          slug={slug}
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
      </div>
    </Container>
  );
};

export default Clothing;
