import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

//img
// import img1 from "../../assets/images/ecommerce/home/img-1.png";
// import img2 from "../../assets/images/ecommerce/home/img-2.png";
// import img3 from "../../assets/images/ecommerce/home/img-6.jpg";

const Collection = () => {

    const [slider, setSlider] = useState([]);
    const getSlider = async () => {
        try {
            const request = await axios.get("http://avontest0910-001-site1.dtempurl.com/api/Sliders/Manage/GetAll?isDeleted=false");
            if (request.status == 200) {
                const response = request.data;
                console.log(response);
                setSlider(response)
            } else {
                throw new Error("Sorguda xeta bas verdi")
            }
        } catch (error) {
            alert(error.message)
        }
    }
    useEffect(() => {
        getSlider()
    }, []);
    console.log(slider);
    return (
        <>
            <section className="position-relative">
                {
                    slider.map((foto, ind) => {
                        return (
                            <Carousel key={ind} id="ecommerceHero" data-bs-ride="carousel">
                                <Carousel.Item >
                                    <div style={{ maxWidth: "1600px", height: "100vh", marginTop:"70px"}} className="ecommerce-home bg-danger-subtle">
                                        <Link style={{ display: "block", width: "100%" }} to={foto.link}>
                                            <img style={{ width: "100%", height: "100%" }} src={foto.image} />
                                        </Link>
                                    </div>
                                </Carousel.Item>
                            </Carousel>
                        )
                    })
                }
            </section>
        </ >
    )
}

export default Collection;