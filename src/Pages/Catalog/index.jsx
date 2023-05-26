import React from 'react';
import Clothing from './Clothing';
import Deals from './deals';
import EmailClothe from './EmailClothe';
import { CommonService } from '../../Components/CommonService';

const Catalog = () => {
    document.title = "Catalog | RGAgency - React FrontEnd";

    return (
        <>
            <Clothing />
            <Deals />
            <EmailClothe />
           < CommonService />
        </>
    );
}

export default Catalog;