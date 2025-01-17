import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box,Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const OperationalTable = ({onBack}) => {
  
  const [rows, setRows] = useState([]);
  const [loading,setLoading] = useState(true);
  const [columns] = useState([
    { field: 'srno', headerName: 'Sr-No', width: 50 },
    { field: 'domainName', headerName: 'Domain Name', width: 250 },
    { field: 'ip', headerName: 'IP', width: 250 },
    { field: 'operationalDate', headerName: 'Operational Date', width: 180 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'queriesLast10Days', headerName: 'Queries (Last 10 Days)', type: 'number', width: 180 },
  ]);

   const navigate=useNavigate();
    const handleBack =(path)=>{
      navigate(path);
    }

  useEffect(() => {
    axios.get('https://typo.coednssecurity.in:5001/operationaldomain10days')
      .then((response) => {
        const processedData = [];
        let rowId = 0;
        let srno = 1;

        response.data.data.forEach((domain) => {
          if (domain.domain_name && Array.isArray(domain.ip_addresses)) {
            const { domain_name, ip_addresses } = domain;

            ip_addresses.forEach((ipData, index) => {
              processedData.push({
                srno:index === 0 ? srno++ : '',
                id: rowId++, 
                domainName: index === 0 ? domain_name : '', 
                ip: ipData.ip,
                operationalDate: ipData.operational_date,
                status: domain.status,
                queriesLast10Days: ipData.queries_last_10_days,
              });
            });
          }
        });

        setRows(processedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
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
       <Header title="Domain which became operational in last 10 days"></Header>
      <style>{keyframes}</style>
      <div
          style={{
              fontSize: '20px',
              fontFamily: 'Arial, sans-serif',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-45%, -50%)',  // Centers the div both horizontally and vertically
              height: '100vh',  // Ensures the container takes up the full height of the viewport
              width: '100vw'   // Ensures the container takes up the full width of the viewport
          }}
      >
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


  return (
   
   <Box sx={{ height: '100%', width: '100%', padding: '20px' }}>
   
        <Header title="Domain which became operational in last 10 days"></Header>
        <Button
                      //onClick={onBack}
                      onClick={()=>handleBack('/')}
                      variant="outlined"
                      color="info"
                      startIcon={<ArrowBackIcon />}
                      sx={{marginBottom:"10px"}}
      
                  >
                      Back
                  </Button>
        

    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ height: 800, width: '100%' }}>
      
          <DataGrid
            rows={rows}
            columns={columns}
           
            pageSize={1000}  
            pageSizeOptions={[100, 500, 1000, 2000]}  
          />
        
      </div>
    </Box>
  </Box> 
    
  );
};

export default OperationalTable;
