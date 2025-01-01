import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RawDataDisplay = () => {
  const [data, setData] = useState(null);       
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);       


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await axios.get("https://typo.coednssecurity.in:5001/recentqueriedlast5days");
        console.log("the data is ",response); 
        
        
          setData(response.data);
       
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h1>Fetched Data</h1>

      {loading && <p>Loading...</p>}  

      {error && <p style={{ color: 'red' }}>{error}</p>}  

     
      {!loading && !error && (
        <pre>
          {JSON.stringify(data, null, 2)} 
        </pre>
      )}
    </div>
  );
};

export default RawDataDisplay;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const ClientSidePagination = () => {
//   const [data, setData] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1); 
//   const [itemsPerPage] = useState(10); 

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true); 
//         const response = await axios.get('https://typo.coednssecurity.in:5001/nonoperationaldomain10days');
//         setData(response.data.data || []); 
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setData([]); 
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchData();
//   }, []);

 
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       <h1>Client-Side Paginated Data</h1>


//       {loading ? (
//         <div className="loading-container">
//          loading..........
//         </div>
//       ) : (
//         <>
        
//           <pre>
//             {JSON.stringify(currentItems, null, 2)} 
//           </pre>

      
//           <div className="pagination">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span>Page {currentPage} of {totalPages}</span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ClientSidePagination;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Nxdata() {
//   const [data, setData] = useState(null); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 
//   const [currentPage, setCurrentPage] = useState(1); 
//   const [itemsPerPage, setItemsPerPage] = useState(10); 

//   const fetchApiDataClientIpnxDomain = async () => {
//     try {
//       const response = await axios.get("https://typo.coednssecurity.in:5001/operationaldomain10days");//operationaldomain10days  recentqueriedlast5days
//       console.log("last 5 days data :-", response.data.data);
//       //console.log("the length of the data is");
//       setData(response.data.data); 

//       // console.log("Total data length:", response.data.length);
//     } catch (error) {
//       console.error("Error fetching data", error);
//       setError(error); 
//     } finally {
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     fetchApiDataClientIpnxDomain(); 
//   }, []);


//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   const currentData = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];


//   const nextPage = () => {
//     if (currentPage < Math.ceil(data.length / itemsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   if (error) {
//     return <div>Error fetching data: {error.message}</div>; 
//   }

//   return (
//     <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px" }}>
//       <h3>API Data:</h3>
//       <pre
//         style={{
//           backgroundColor: "#f4f4f4",
//           padding: "10px",
//           borderRadius: "5px",
//           whiteSpace: "pre-wrap",
//           wordWrap: "break-word",
//           color: "black",
//         }}
//       >
//         {JSON.stringify(currentData, null, 2)} 
//       </pre>
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={prevPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span style={{ margin: "0 10px" }}>
//           Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
//         </span>
//         <button
//           onClick={nextPage}
//           disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Nxdata;

// TreeMapComponent.js

// FunnelChart.js
// import React from 'react';
// import { ResponsiveBar } from '@nivo/bar';


// const logScale = (value) => Math.log10(value);

// const BarGraph = () => {
 
//   const data = [
//     { id: "Last 5 days", value: 74000 },
//     { id: "Total New IPs Found", value: 64000 },
//     { id: "Total Operational Domain", value: 54000 },
//     { id: "Total Non-Operational Domain", value: 7 },
//     { id: "Domain Changed", value: 7 },
//   ];


//   const maxValue = Math.max(...data.map(item => item.value));

 
//   const scaledData = data.map(item => ({
//     id: item.id,
//     logValue: logScale(item.value),
//     originalValue: item.value,
//   }));
//   console.log(scaledData);

//   return (
//     <div style={{ height: '500px' }}>
//       <h2>Responsive Bar Graph with Logarithmic Scaling</h2>
//       <ResponsiveBar
//         data={scaledData}
//         keys={['logValue']} 
//         indexBy="id"
//         margin={{ top: 30, right: 30, bottom: 60, left: 60 }}
//         padding={0.3}
//         colors={{ scheme: 'accent' }}  
//         layout="vertical"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: 'Domain',
//           legendPosition: 'middle',
//           legendOffset: 50,
//         }}
//         axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: 'Logarithmic Value',
//           legendPosition: 'middle',
//           legendOffset: -40,
//         }}
       
//         theme={{
//           axis: {
//             domain: {
//               line: {
//                 stroke: '#777',
//               },
//             },
//             ticks: {
//               line: {
//                 stroke: '#777',
//                 strokeWidth: 1,
//               },
//               text: {
//                 fontSize: 12,
//                 fill: '#777',
//               },
//             },
//           },
//           legends: {
//             text: {
//               fontSize: 14,
//               fill: '#333',
//             },
//           },
          
//         }}
        
//         tooltip={({ id, value, indexValue }) => {
//           const originalValue = scaledData.find(item => item.id === indexValue).originalValue;
//           return (
//             <div style={{ padding: '5px', color: 'black',background:"#bcc4c4" }}>
//               <strong>{indexValue}</strong>
             
//               {originalValue}
//             </div>
//           );
//         }}
     
//         label={({ indexValue }) => {
//           const originalValue = scaledData.find(item => item.id === indexValue).originalValue;
//           return `${originalValue}`
//         }}
//         labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        
//       />
//     </div>
//   );
// };

// export default BarGraph;
// import React from 'react';
// import { ResponsiveTreeMap } from '@nivo/treemap';


// const logScale = (value) => Math.log10(value);

// const TreeMapGraph = () => {

//   const data = [
//     { id: "Last 5 days", value: 740000 },
//     { id: "Total New IPs Found", value: 64000 },
//     { id: "Total Operational Domain", value: 54000 },
//     { id: "Total Non-Operational Domain", value: 7 },
 
//   ];

//   const scaledData = data.map(item => ({
//     id: item.id,
//     value: logScale(item.value), 
//     originalValue: item.value,   
//   }));

 
//   const treeMapData = {
//     name: "root",
//     children: scaledData.map(item => ({
//       name: item.id,
//       value: item.value,
//       originalValue: item.originalValue,
//     })),
//   };
//   const handleRectangleClick = (domainName) => {
//     console.log("clicked",domainName);

//   };
//   const tooltipStyle = {
//     backgroundColor: 'white',
//     color: 'green',
//     borderRadius: '5px',
//     padding: '10px',
//     fontSize: '14px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)', 
//   };
  
//   return (
//     <div style={{ height: '500px' }}>
//       <h2>Responsive TreeMap with Logarithmic Scaling</h2>
//       <ResponsiveTreeMap
//         data={treeMapData}
       
//         identity="name"  
//         leavesOnly={true} 
       
//         value="value"  
//         valueFormat=".02s"    
//         leaveSpace={0}     
//         margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//         colors={{ scheme: 'set2' }} 
//         nodeOpacity='0.9'
//         borderWidth= '3px'
//         borderColor='white' 
//         //label={node => node.data.name} 
//         labelTextColor={{ from: 'color', modifiers: [['brighter', 8]] }} 
//         theme={{
//           axis: {
//             domain: {
//               line: {
//                 stroke: '#FFFFFF',
//               },
//             },
//             legend: {
//               text: {
//                 fill: '#FFFFFF',
//               },
//             },
//             ticks: {
//               line: {
//                 stroke: '#FFFFFF',
//                 strokeWidth: 1,
//               },
//               text: {
//                 fill: '#FFFFFF',
//               },
//             },
//           },
//           legends: {
//             text: {
//               fill: '#FFFFFF',
//             },
//           },
//           tooltip: {
//             container: {
//               color: '#1976D2',
//             },
//           },
//         }}
//         label={node => node.data.originalValue} 
//         onClick={(node) => handleRectangleClick(node)} 
//         //labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        
     
//         tooltip={({ node}) => {
//           const originalValue = node.data.originalValue;
//           const label = node.data.name;
//           return  (
//             <div style={tooltipStyle}>
//               <strong>{label}</strong>
//               <strong>{"-"+originalValue}</strong>
              
//             </div>
//           );
//         }}
//       />
//     </div>
//   );
// };

// export default TreeMapGraph;


