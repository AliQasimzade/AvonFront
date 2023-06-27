import React from "react";
import AvonLogo from "../../assets/images/Logo.svg";
import { Helmet } from "react-helmet-async";
const NotFound = () => {
  return (
    <div style={{height:'100vh'}}>
      <Helmet>
        <title>Səhifə tapılmadı – Online kosmetika mağazası</title>
      </Helmet>
      <div className="page-not-found-main d-flex justify-content-center flex-column align-items-center h-100">
        <img src={AvonLogo} alt="Logo" style={{width:'180px', }}/>
        <h2 className="entry-title">
          404 <i className="fas fa-file"></i>
        </h2>
        <p style={{fontSize:'22px'}}> Çox təəssüf, axtardıqınız səhifə mövcud deyil.</p>
      </div>
    </div>
  );
};

export default NotFound;
