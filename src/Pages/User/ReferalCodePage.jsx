import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ReferalCodePage = () => {
const navigate = useNavigate();
const user = useSelector(state => state.persistedReducer.Accont.user);

console.log(user[0].id);
useEffect(() => {
     if(!user[0].id) {
         navigate('/giris')
     }  
},[user])

  return (
    <div>
      <h1>Referal Kodunuz: <span>{user[0]?.referalIdforTeam}</span></h1>
    </div>
  )
}

export default ReferalCodePage
