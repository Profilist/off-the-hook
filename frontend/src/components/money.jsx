import React from 'react'
import { useState, useEffect } from 'react'

const Money = () => {
    useEffect(() => {
        fetch('http://localhost:5173/listings', {
            method: "GET",
        })
        .then((res) => {
            return res.json();
        })
        .then(data => {
            setMoney(data);
            console.log(list)
        })
    }, [])
    const [money, setMoney] = useState(0);
  return (
    <>
        <div>Money: s{money}</div>
    </>
    
    
  )
}

export default Money