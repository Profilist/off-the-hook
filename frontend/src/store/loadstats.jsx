// src/components/YourComponent.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from './store';

const LoadStats = () => {
  const dispatch = useDispatch();
     
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/users/most_loot');
      const data = await response.json();
      const totalLoot = data.reduce((acc, row) => acc + row.loot, 0);
      dispatch(setData(data));

    };

    fetchData();
  }, [dispatch]);

  
  return (
    <>
    </>
  );
};

export default LoadStats;
