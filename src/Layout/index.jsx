import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { changeLayoutMood, changeThemeMood } from '../slices/thunk';
import TopBar from './TopBar';
import Footer from './Footer';
import Header from "./Header";

const Layout = (props) => {

    const dispatch = useDispatch();
    const { footerModeType, layoutThemeMode } = useSelector((state) => ({
        footerModeType: state.Layout.footerModeType,
        layoutThemeMode: state.Layout.layoutThemeMode
    }));

    //change footer theme on review page
    const footertheme = props.isLight ? "light" : "dark";

    //change them mode
    const handleThemeMood = (value) => {
        if (changeThemeMood) {
            dispatch(changeThemeMood(value))
        }
    }

    //top arrow icone function
    const ScrollbarTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }


    useEffect(() => {
        if (footerModeType || layoutThemeMode) {
            dispatch(changeLayoutMood(footertheme));
            dispatch(changeThemeMood(layoutThemeMode));
        }
    }, [layoutThemeMode, dispatch, footertheme, footerModeType]);

    return (
        <>
        
            <TopBar />
            <Header handleMood={handleThemeMood} />
            {props.children}
            <Footer />
            <Link to="../backend/index.html"
                className="btn btn-warning position-fixed bottom-0 start-0 m-5 z-3 btn-hover d-none d-lg-block">
                <i className="bi bi-database align-middle me-1"></i> Backend</Link>
            <Button
                onClick={ScrollbarTop}
                variant="info"
                className="btn-icon"
                style={{ bottom: "50px", display: "block" }}
                id="back-to-top">
                <i className="ri-arrow-up-line"></i>
            </Button>

        </>
    );
}

export default Layout;