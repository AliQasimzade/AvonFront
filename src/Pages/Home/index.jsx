import React, {useEffect} from 'react';
import Collection from './Collection';
import Service from './CollectionService';
import LastestCollection from './Slider/LatestCollection';
import Shopping from './ShopingService';
import TopProducts from './TopProduct';
import CollectionSlider from './Slider/CollectionSlider';
import Shoping from './Shopping';
import FollowUs from './FollowUs';
import { fetchSubCategories } from "../../slices/layouts/subcategories";
import { useDispatch } from 'react-redux';

const Home = () => {
    document.title = "AVON.NET.AZ – Online kosmetika mağazası";
    const dispatch = useDispatch();
    useEffect(() => {
     dispatch(fetchSubCategories())
    },[])
    return (
        <>
            <Collection />
            <Service />
            <TopProducts />
            <Shopping />
            <LastestCollection />
            <CollectionSlider />
            <Shoping />
            <FollowUs />
        </>
    );
}

export default Home;