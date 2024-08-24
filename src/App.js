import React, { useState } from 'react';
import './App.css';
import Button from './Button';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

function App() {
   const [valNum, setValNum] = useState('');
   const [displayNum, setDisplayNum] = useState('');
   const [valPercentage, setValPercentage] = useState('');
   const [chartData, setChartData] = useState({
       labels: [],
       datasets: [
           {
               label: 'Calculation Results',
               data: [],
               backgroundColor: [
                   'rgba(255, 99, 132, 0.6)',
                   'rgba(54, 162, 235, 0.6)'
               ],
               borderColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)'
               ],
               borderWidth: 1,
           },
       ],
   });

   const handleChange = (event) => {
       setValNum(event.target.value);
   };

   const handlePercentageChange = (event) => {
       setValPercentage(event.target.value);
   };

   const handleHalf = () => {
       const num = parseFloat(valNum);
   
       if (isNaN(num)) {
           setDisplayNum(`Please enter a valid number.`);
       } else if (num <= 0) {
           setDisplayNum(`Please enter a number greater than 0.`);
       } else {
           const halfNum = num / 2;
           setDisplayNum(`Half of ${num} is ${halfNum}`);
   
           setChartData({
               labels: ['Half', 'Remaining'],
               datasets: [
                   {
                       label: 'Half Calculation',
                       data: [halfNum, halfNum],
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.6)', // Color for half part
                           'rgba(54, 162, 235, 0.6)'  // Color for remaining part
                       ],
                       borderColor: [
                           'rgba(255, 99, 132, 1)',
                           'rgba(54, 162, 235, 1)'
                       ],
                       borderWidth: 1,
                   },
               ],
           });
       }
   };

   const handlePercent = () => {
       const num = parseFloat(valNum);
       const percentage = parseFloat(valPercentage);

       if (isNaN(num) || isNaN(percentage)) {
           setDisplayNum(`Please enter valid numbers for both fields.`);
       } else if (num <= 0) {
           setDisplayNum(`Please enter a number greater than 0.`);
       } else if (percentage < 0 || percentage > 100) {
           setDisplayNum(`Please enter a percentage between 0 and 100.`);
       } else {
           const percentNum = (num * percentage) / 100;
           const remainingNum = num - percentNum;
           setDisplayNum(`${percentage}% of ${num} is ${percentNum}`);

           setChartData({
               labels: [`${percentage}% of ${num}`, 'Remaining'],
               datasets: [
                   {
                       label: 'Percentage Calculation',
                       data: [percentNum, remainingNum],
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.6)', // Color for percentage part
                           'rgba(54, 162, 235, 0.6)'  // Color for remaining part
                       ],
                       borderColor: [
                           'rgba(255, 99, 132, 1)',
                           'rgba(54, 162, 235, 1)'
                       ],
                       borderWidth: 1,
                   },
               ],
           });
       }
   };

   const handleSquareRoot = () => {
       const num = parseFloat(valNum);
       if (isNaN(num)) {
           setDisplayNum(`Please enter a valid number.`);
       } else if (num <= 0) {
           setDisplayNum(`Please enter a number greater than 0.`);
       } else {
           const sqrNum = Math.sqrt(num);
           setDisplayNum(`Square Root of ${num} is ${sqrNum.toFixed(2)}`);

           setChartData({
               labels: ['Square Root', 'Remaining'],
               datasets: [
                   {
                       label: 'Square Root Calculation',
                       data: [sqrNum, num - sqrNum],
                       backgroundColor: [
                           'rgba(255, 99, 132, 0.6)', // Color for square root part
                           'rgba(54, 162, 235, 0.6)'  // Color for remaining part
                       ],
                       borderColor: [
                           'rgba(255, 99, 132, 1)',
                           'rgba(54, 162, 235, 1)'
                       ],
                       borderWidth: 1,
                   },
               ],
           });
       }
   };

   //const showChartData = () => {
   //    alert(JSON.stringify(chartData, null, 2));
   //};

   return (
       <div className="App">
           <h1>Learn Math</h1><br />
           <h2>Input a number to perform one of three calculations.</h2><br />
           <input type="text" value={valNum} onChange={handleChange} /><br /><br /><br />
           Click a button below to see your answer:<br />
           <table width='100%'>
               <tbody>
                   <tr>
                       <td><Button label="Half the Number" onClick={handleHalf} /></td>
                   </tr>
                   <tr>
                       <td><Button label="SquareRoot of the Number" onClick={handleSquareRoot} /></td>
                   </tr>
                   <tr>
                       <td><Button label="Percentage of the Number" onClick={handlePercent} /></td>
                   </tr>
                   <tr>
                       <td><b>Indicate Percentage to use:</b><input type="text" style={{ width: '40px' }} value={valPercentage} onChange={handlePercentageChange} /></td>
                   </tr>
               </tbody>
           </table>
           {displayNum && <p style={{ fontSize: '30px', fontWeight: 'bold', color: 'green' }}>{displayNum}</p>}<br />
           <table width='100%'>
               <tbody>
                   <tr>
                       <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '300px', border: '2px solid black', verticalAlign: 'middle', textAlign: 'center'}}>
                       
                           <Pie
                               data={chartData}
                               options={{
                                   responsive: true,
                                   plugins: {
                                       legend: {
                                           position: 'top',
                                       },
                                   },
                               }}
                               style={{ width: '100%', height: '100%' }}
                           />
                    
                       </td> 
                    </tr>
               </tbody>     
           </table>    
           {/*<button onClick={showChartData}>Debug Chart Data</button>*/}
       </div>
   );
}

export default App;