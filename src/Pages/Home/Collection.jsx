import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
const Collection = () => {

    const [slider, setSlider] = useState([]);
    const getSlider = async () => {
        try {
            const request = await axios.get("https://avonazerbaijan.com/api/Sliders/Manage/GetAll?isDeleted=false");
            if (request.status == 200) {
                const response = request.data;
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
    return (
        <>
            <section className="position-relative">


                <Carousel id="ecommerceHero" data-bs-ride="carousel">
                    {
                        slider.map((foto, ind) => {
                            return (
                                <Carousel.Item key={ind} >
                                    <div style={{ maxWidth: "1600px", maxHeight: '100%', height: "100%" }} className="ecommerce-home bg-danger-subtle">
                                        <Link style={{ display: "block", width: "100%", height:'100%' }} to={foto.link}>
                                            <img style={{ width: "100%", height: "100%", objectFit:'cover' }} src={foto.image} />
                                        </Link>
                                    </div>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>


            </section>
        </ >
    )
}

export default Collection;