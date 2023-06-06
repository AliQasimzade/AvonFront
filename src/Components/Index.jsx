import React, { useState } from "react";
import CatalogCollection from "../Pages/Catalog/CatalogCollection";
import Filters from "../Pages/Catalog/Filters";
import { getAllProducts } from "../services/getRequests";
import { useEffect } from "react";

const Index = ({ name, cxxl, clg, cmd, cxl }) => {
    const [filterList, setFilterlist] = useState([]);
    useEffect(() => {
        fetchProd();
    }, [])
    
    const fetchProd = async () => {
        try {
            const product = await getAllProducts();
            setFilterlist(product);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Filters
                setFilterlist={setFilterlist}
                name={name}
            />
            <CatalogCollection
                filterList={filterList}
                cxxl={cxxl}
                clg={clg}
                cmd={cmd}
                cxl={cxl}
            />
        </>
    );
}

export default Index;