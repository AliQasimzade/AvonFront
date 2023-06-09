import React, { useState } from "react";
import CatalogCollection from "../Pages/Catalog/CatalogCollection";
import Filters from "../Pages/Catalog/Filters";
const Index = ({ name, cxxl, clg, cmd, cxl }) => {
  return (
    <>
      <Filters name={name} />
      <CatalogCollection cxxl={cxxl} clg={clg} cmd={cmd} cxl={cxl} />
    </>
  );
};

export default Index;
