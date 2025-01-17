import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { Button, colors } from '@mui/material';
import Last5daysTable from '../scence/DynamicTable/Last5days.jsx';
import OperationalTable from '../scence/DynamicTable/OperationalTable.jsx';
import NonOperationalTable from '../scence/DynamicTable/NonOperationalTable.jsx';
import NewIpTable from '../scence/DynamicTable/NewIpTable.jsx';
import DnsRecordChangedTable from '../scence/DynamicTable/DnsRecordChangedTable .jsx';
import { fetchApiDataDynamics } from '../data/mockData.js';
import Header from "../components/Header.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

 const TreeMapDisplay = () => {
  const [data, setData] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const logScale = (value) => Math.log10(value);
  const[loading,setLoading] = useState(true);
  const[upm,setUpm] = useState(false)


  const customLabel = (node) => {
    return `${node.id} -- ${node.data.originalValue} `;
};



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setUpm(false)
      try {
        const responseData = await fetchApiDataDynamics();

        setLoading(false);
        if(responseData.status == "UPM")
        {
          setUpm(true);
        }
        else{
          
          const data =  [
            { name: 'Domain which were queried for the First Time in Last 5 Days', loc: responseData.recentqueriedlast5days},
            { name: 'Domain which started operating on new IP address in last 10 Days', loc: responseData.newipslast10days },
            {name: 'Domains which became operational in last 10 days', loc: responseData.operationaldomain10days },
            {name: 'Domains which went out-of-operation in last 10 days', loc: responseData.nonoperationaldomain10days },
            {name: 'Domains which updated their Whois records in last 10 days', loc: responseData.dnsrecordlast10},
         ];
 
         const scaledData = data.map(item => ({
           name: item.name,
           value: logScale(item.loc), 
           originalValue: item.loc,   
         }));
 
         const treeMapData = {
           name: "root",
           children: scaledData.map(item => ({
             name: item.name,
             value: item.value,
             originalValue: item.originalValue,
           })),
         };
 
         console.log(treeMapData);
 
         setData(treeMapData);

        }

       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const tooltipStyle = {
    backgroundColor: 'white',
    color: '#f74040',
    borderRadius: '10px',
    padding: '10px',
    fontSize: '14px',
    boxShadow: '0 2px 100px rgba(0, 0, 0, 0.5)', 
  };

  const labelStyle = {
    color: "blue",
    fontSize: "14px",
    fontWeight: "bold",
    textOverflow: 'ellipsis', 
    whiteSpace: 'normal',    
    overflow: 'hidden',      
    wordWrap: 'break-word',  
    wordBreak: 'break-word', 
    maxWidth: '100%',        
  };

  const handleRectangleClick = (domainName) => {
    console.log("clicked", domainName);
    setSelectedDomain(domainName);
  };

  const handleBackToMap = () => {
    setSelectedDomain(null); 
  };

  if (!data) {
    const dotStyle = (delay) => ({
        animation: `blink 1.5s infinite`,
        animationDelay: `${delay}s`,
        opacity: 0,
    });

    const keyframes = `
        @keyframes blink {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
    `;

    return (
        <>
            <style>{keyframes}</style>
            <div style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' ,justifyContent:"center",alignItems:"center",display: 'flex',top: 0,
                left: 0,
                width: '100%',
                height: '100%', }}>
                Loading
                <span>
                    <span style={dotStyle(0.2)}>.</span>
                    <span style={dotStyle(0.4)}>.</span>
                    <span style={dotStyle(0.6)}>.</span>
                    <span style={dotStyle(0.8)}>.</span>
                </span>
            </div>
        </>
    );
}
  if(upm){
    return (
      <div style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' ,justifyContent:"center",alignItems:"center",display: 'flex', top: 0,
        left: 0,
        width: '100%',
        height: '100%',}}>
        Sorry..! Data is not avilable at the moment..!
       
    </div>
    )
    

};

  let tableComponent;
  switch (selectedDomain) {
    case 'Domain which were queried for the First Time in Last 5 Days':
      tableComponent = <Last5daysTable onBack={handleBackToMap} />;
      break;
    case 'Domain which started operating on new IP address in last 10 Days':
      tableComponent = <NewIpTable onBack={handleBackToMap}  />;
      break;
    case 'Domains which became operational in last 10 days':
      tableComponent = <OperationalTable onBack={handleBackToMap}  />;
      break;
    case 'Domains which went out-of-operation in last 10 days':
      tableComponent = <NonOperationalTable onBack={handleBackToMap}  />;
      break;
    case 'Domains which updated their Whois records in last 10 days':
      tableComponent = <DnsRecordChangedTable onBack={handleBackToMap}  />;
      break;
    default:
      tableComponent = null;
  }

  if (!selectedDomain) {
    return (
      <div style={{ height: '600px', width: '100%', position: 'relative' }}>
        <Header title="Recent Salient Statistics" />
        <ResponsiveTreeMap
  data={data}
  nodeOpacity="0.5"
  colors={{ scheme: 'set3' }} 



  identity="name"
  value="value"
  
  label={customLabel}


  borderWidth="4px"
  parentLabelSize={20}
  valueFormat=".04s"
  margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
  labelSkipSize={-10}
  labelTextColor={{ from: 'color', modifiers: [['darker', 10]] }}
  parentLabelPosition="right"
  parentLabelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
  borderColor={{ from: 'color', modifiers: [['darker', 1.1]] }}
  onClick={(node) => handleRectangleClick(node.id)}
  theme={{
    axis: {
      domain: { line: { stroke: '#FFFFFF' } },
      legend: { text: { fill: '#FFFFFF' } },
      ticks: { line: { stroke: '#FFFFFF', strokeWidth: 1 }, text: { fill: '#FFFFFF' } },
    },
    legends: { text: { fill: '#FFFFFF' } },
    labels: { text: { fontSize: 15, lineBreak: 'break-word' } },
    tooltip: { container: { color: '#1976D2' } },
  }}
  leavesOnly={true}
  tooltip={({ node }) => {
    //console.log("in tooltip",node)
    const originalValue = node.data.originalValue;
    const label = node.data.name;
    return (
      <div style={tooltipStyle}>
        <strong>{label}</strong>
        <strong>{` - ${originalValue}`}</strong>
      </div>
    );
  }}
/>

      </div>
    );
  }

  return (
    <div>
       {/* <Button
                onClick={handleBackToMap}
                variant="outlined"
                color="info"
                startIcon={<ArrowBackIcon />}

            >
                Back
            </Button> */}
      {tableComponent}
    </div>
  );
};

export default TreeMapDisplay;





