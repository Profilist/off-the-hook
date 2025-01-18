import React from 'react'
import './leaderboard.css'

const Leaderboard = () => {
    const data = [
        { name: "Larris", money: 24 },
        { name: "Felix", money: 29 },
        { name: "Chris", money: 32 },
        { name: "Larris", money: 24 },
        { name: "Felix", money: 29 },
        { name: "Chris", money: 32 },
        { name: "Larris", money: 24 },
        { name: "Felix", money: 29 },
        { name: "Chris", money: 32 },
        { name: "Larris", money: 24 },
        { name: "Felix", money: 29 },
        { name: "Chris", money: 32 }
        ,
      ];
   
  return (
    <>
    <div className='leaderboard'>
        <div className='rankings'>
            <h1>Hacker Rankings</h1>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Money Scammed</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.money}</td>
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