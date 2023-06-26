import React from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SubCatProduct = () => {
    const subcategories = useSelector(state => state.persistedReducer.Subcategories);
    const {name} = useParams();
    const findSubCat = [...subcategories].find(sub => sub.name == name);
  return (
    <div>SubCatProduct</div>
  )
}

export default SubCatProduct