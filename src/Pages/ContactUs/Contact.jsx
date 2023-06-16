import React , {useState , useEffect} from "react";
import axios from "axios";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { PostMessageWithAboutUs } from "../../services/postRequests";

const ContactUs = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please Enter Your Name'),
            email: Yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Please Enter Your Email"),
            number: Yup.string().required('Please Enter Your number'),
            message: Yup.string().required("Please Enter Your some message")
        }),
        onSubmit: async (values) => {
           const res = await PostMessageWithAboutUs(values);
           console.log(res);
        },
    });

    const [contact, setContact] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://ilkin944-001-site1.itempurl.com/api/Settings/Manage/GetAll?isDeleted=false');
            setContact(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error.message);
          }
        };
    
        fetchData();
      }, []);

    return (
        <>
            <section className="ecommerce-about bg-primary">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={5}>
                            <div className="text-center">
                                <h1 className="text-white">Bizimlə əlaqə saxlayın</h1>
                                <p className="fs-16 mb-0 text-white-75">Gəlin birlikdə möhtəşəm bir şeyə başlayaq. Bu gün komandadan biri ilə əlaqə saxlayın!</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="section">
                <Container>
                    <Row>
                        <Col lg={4}>
                            {
                               contact.length > 0 &&
                               <div>
                                     <Card  className="border border-opacity-25">
                                            <Card.Body className="p-4">
                                                <div className="d-flex">
                                                    <div className="avatar-sm flex-shrink-0">
                                                        <div className="avatar-title rounded fs-17">
                                                            <i className="bi bi-geo-alt-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="ms-3 flex-grow-1">
                                                        <h5 className="fs-17 lh-base mb-2">{contact[5].key.toUpperCase()}</h5>
                                                        <p className="text-muted fs-14 mb-0">{contact[5].value}</p>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>

                                        <Card  className="border border-opacity-25">
                                            <Card.Body className="p-4">
                                                <div className="d-flex">
                                                    <div className="avatar-sm flex-shrink-0">
                                                        <div className="avatar-title rounded fs-17">
                                                            <i className="bi bi-telephone-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="ms-3 flex-grow-1">
                                                        <h5 className="fs-17 lh-base mb-2">{contact[0].key}</h5>
                                                        <p className="text-muted fs-14 mb-0">{contact[0].value}</p>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>

                                        <Card  className="border border-opacity-25">
                                            <Card.Body className="p-4">
                                                <div className="d-flex">
                                                    <div className="avatar-sm flex-shrink-0">
                                                        <div className="avatar-title rounded fs-17">
                                                            <i className="bi bi-envelope-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="ms-3 flex-grow-1">
                                                        <h5 className="fs-17 lh-base mb-2">{contact[3].key}</h5>
                                                        <p className="text-muted fs-14 mb-0">{contact[3].value}</p>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                               </div>
                  
                            }
                        </Col>

                        <Col lg={8}>
                            <div className="custom-form card p-4 p-lg-5">
                                <Form name="myForm" action="#" onSubmit={formik.handleSubmit}>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="text-center mb-4">
                                                <h3 className="text-capitalize">Əlavə məlumat üçün bizimlə əlaqə saxlayın</h3>
                                            </div>
                                        </Col>
                                        <Col lgt={6}>
                                            <div className="form-group mt-3">
                                                <Form.Label htmlFor="nameInput">Adı<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    name="name"
                                                    id="nameInput"
                                                    type="text"
                                                    placeholder="Adı daxil edin"
                                                    value={formik.values.name}
                                                    onBlur={formik.handleBlur}
                                                    onChange={formik.handleChange} />
                                                {
                                                    formik.errors.name && formik.touched.name ? (
                                                        <span className="text-danger">{formik.errors.name}</span>
                                                    ) : null
                                                }
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="form-group mt-3">
                                                <Form.Label htmlFor="emailInput">E-Poçt<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    name="email"
                                                    id="emailInput"
                                                    type="email"
                                                    placeholder="Poçt ünvanını daxil edin"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {
                                                    formik.errors.email && formik.touched.email ? (
                                                        <span className="text-danger">{formik.errors.email}</span>
                                                    ) : null
                                                }
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group mt-3">
                                                <Form.Label htmlFor="numberInput">Nömrə<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    id="numberInput"
                                                    placeholder="Nömrənizi daxil edin"
                                                    name="number"
                                                    value={formik.values.subject}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {
                                                    formik.errors.subject && formik.touched.subject ? (
                                                        <span className="text-danger">{formik.errors.subject}</span>
                                                    ) : null
                                                }
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="form-group mt-3">
                                                <Form.Label htmlFor="messageInput">Mesaj<span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="message"
                                                    id="messageInput"
                                                    rows={4}
                                                    placeholder="Mesajınızı daxil edin"
                                                    value={formik.values.message}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                >
                                                    {
                                                        formik.errors.message && formik.touched.message ? (
                                                            <span className="text-danger">{formik.errors.message}</span>
                                                        ) : null
                                                    }
                                                </Form.Control>
                                            </div>
                                        </Col>
                                        <Col lg={12}>
                                            <div className="text-end mt-4">
                                                <Button type="submit" id="submit" name="submit" variant="primary" >Mesaj Göndər <i className="bi bi-arrow-right-short align-middle fs-16 ms-1"></i></Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section >
            {/* <section>
                <Container fluid className="px-0">
                    <Row className="g-0">
                        <Col lg={12}>
                            <div className="map">
                                {
                                    contact.length > 0 &&
                                    <iframe
                                    title="map"
                                    src= {contact[9].value}
                                    className="w-100"
                                    height="400"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                                }
                              
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section> */}
        </ >
    )
}

export default ContactUs;