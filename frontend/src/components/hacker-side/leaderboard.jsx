import React from 'react'
import './leaderboard.css'
import { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch('http://localhost:5000/users/most_loot')
        .then((response) => response.json())
        .then((data) => setData(data));
  }, []);
    
  const totalLoot = data.reduce((acc, row) => acc + row.loot, 0);
  const numberOfEntries = data.length;
   
  return (
    <>
    <div className='leaderboard'>
        <div className='rankings'>
            <h1>Hacker Rankings</h1>
            <table>
              <thead>
                <tr>
                  <th style={{width: "10%"}}>Rank</th>
                  <th>Name</th>
                  <th>Money Scammed</th>
                  <th>People Scammed</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.loot}</td>
                    <td>{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>

    </div>
    </>
  )
}

export default Leaderboard;
