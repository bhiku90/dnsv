import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Paper,Box } from '@mui/material';

const DnsRecordChangedTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

 
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
            <style>{keyframes}</style>
            <div style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' ,justifyContent:"center",alignItems:"center",display: 'flex', }}>
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
    <>
      <div>
        <h1>
          DNS Records Changed in the Last 10 Updates
        </h1>
      </div>
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
    </>
  );
};

export default DnsRecordChangedTable;

    