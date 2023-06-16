import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ReferalCodePage = () => {
const navigate = useNavigate();
const user = useSelector(state => state.persistedReducer.Accont.user);

console.log(user);
useEffect(() => {
     if(!user.id) {
         navigate('/giris')
     }  
},[])

  return (
    <div>
      <h1>Referal Kodunuz: <span>{user?.referalIdforTeam}</span></h1>
    </div>
  )
}

export default ReferalCodePage
