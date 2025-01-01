// DomainDetail.jsx
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Button } from '@mui/material';

const DomainDetail = ({ domainData, BacktoChart }) => {
  const ipEntries = Object.entries(domainData)
    .filter(([key]) => key !== 'domaincount') // Exclude domaincount
    .flatMap(([ip, queryTypes]) => 
      Object.entries(queryTypes).map(([queryType, count]) => ({
        id: `${ip}-${queryType}`,
        ip,
        queryType,
        count,
      }))
    );

  const columns = [
    { field: 'ip', headerName: 'IP Address', flex: 1 },
    { field: 'queryType', headerName: 'Query Type', flex: 1 },
    { field: 'count', headerName: 'Count', flex: 1 },
  ];

  return (
    <Box sx={{ height: 400, width: '100%', padding: '20px' }}>
      <Button variant="contained" color="primary" onClick={BacktoChart} style={{ marginBottom: '20px' }}>
        Back to Nxtable
      </Button>
      <Typography variant="h5">Details for Domain</Typography>
      <DataGrid
        rows={ipEntries}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default DomainDetail;