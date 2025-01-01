import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';

const OperationalTable = () => {
  
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
                srno:srno++,
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

  return (
   
    <>
     <div>
        <h1>
          Domain which became operational in last 10 days
        </h1>
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ height: 800, width: '100%' }}>
        {loading ? (
            <div>
                loading......
            </div>
         
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10} // Number of rows per page
            rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
            disableSelectionOnClick // Disable row selection on click
          />
        )}
      </div>
    </Paper>
    </>
    
  );
};

export default OperationalTable;
