import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Paper,Box,Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const DnsRecordChangedTable = ({onBack}) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

   const navigate=useNavigate();
    const handleBack =(path)=>{
      navigate(path);
    }

 
  const [columns] = useState([
    { field: 'srNo', headerName: 'SR-No',  width: 50  },
    { field: 'domain', headerName: 'Domain Name', width: 200 },
    { field: 'expiryDateCurrent', headerName: 'Current_exp_date', width: 150 },
    { field: 'expiryDatePrevious', headerName: 'Previous_exp_Date', width: 150 },
    { field: 'registrantCurrent', headerName: 'Current_Registrant', width: 170 },
    { field: 'registrantPrevious', headerName: 'Previous_Registrant', width: 170 },
    { field: 'registrarCurrent', headerName: 'Current_Registrar', width: 170 },
    { field: 'registrarPrevious', headerName: 'Previous_Registrar', width: 170 },
    { field: 'updateDateCurrent', headerName: 'Current_Updated_Date', width: 150},
    { field: 'updateDatePrevious', headerName: 'Previous_Updated_Date', width: 150 }

]);

  useEffect(() => {
    axios.get('https://typo.coednssecurity.in:5001/dnsrecordlast10')
      .then((response) => {
        const processedData = [];
        let rowId = 0;
        let serialNumber=1;
   

        response.data.data.data.forEach((item) => {
          const { domain,changes, details } = item;

          processedData.push({
            id: rowId++,
            srNo:serialNumber++,
            domain: domain,
            
            expiryDateCurrent: details.expiry_date?.current || 'N/A',   
            expiryDatePrevious: details.expiry_date?.previous || 'N/A',
            registrantCurrent: details.registrant?.current || 'N/A',
            registrantPrevious: details.registrant?.previous || 'N/A',
            registrarCurrent: details.registrar?.current || 'N/A',
            registrarPrevious: details.registrar?.previous || 'N/A',
            updateDateCurrent: details.update_date?.current || 'N/A',
            updateDatePrevious: details.update_date?.previous || 'N/A'
          });
        });
        console.log(processedData);

        setRows(processedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setLoading(true);
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
       
       <Header title=" DNS Records Changed in the Last 10 Updates"></Header>
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
    
     
      <Header title=" DNS Records Changed in the Last 10 Updates"></Header>
      <Button
                     // onClick={onBack}
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
              pageSize={10} 
              rowsPerPageOptions={[5, 10, 25]} 
              disableSelectionOnClick 
            />
   
        </div>
      </Box>
  </Box>
  );
};

export default DnsRecordChangedTable;

    