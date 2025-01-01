import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Button, CircularProgress, Typography } from '@mui/material';

const Last10DaysTable = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (currentPage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://typo.coednssecurity.in:5001/nonoperationaldomain10days', {
        params: {
          page: currentPage,
          itemsPerPage,
        },
      });

      const processedData = [];
      let rowId = (currentPage - 1) * itemsPerPage;
      let srno=1;

      response.data.data.forEach((domain) => {
        if (domain.fqdn && Array.isArray(domain.ip_info)) {
          const { fqdn, ip_info } = domain;

          ip_info.forEach((ipData, index) => {
            processedData.push({
              srno:srno++,
              id: rowId++,
              domainName: index === 0 ? fqdn : '',
              ip: ipData.ip,
              inactiveDate: ipData.first_inactive_date,
              status: ipData.status,
              queriesLast10Days: ipData.query_count_last_10_days,
            });
          });
        }
      });

      setRows(processedData);
      setTotalItems(response.data.totalCount || 0); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const columns = [
    { field: 'srno', headerName: 'Sr-No.', width: 50 },
    { field: 'domainName', headerName: 'Domain Name', width: 250 },
    { field: 'ip', headerName: 'IP', width: 250 },
    { field: 'inactiveDate', headerName: 'Inactive Date', width: 180 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'queriesLast10Days', headerName: 'Queries (Last 10 Days)', type: 'number', width: 200 },
  ];

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
    <Box sx={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Domains Out of Operation in the Last 10 Days
      </Typography>
      {error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : (
        <>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ height: 800, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={itemsPerPage}
                disableSelectionOnClick
              />
            </div>
          </Paper>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px">
            <Button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              variant="contained"
              color="primary"
            >
              Previous
            </Button>
            <Typography>
              Page {page} of {Math.ceil(totalItems / itemsPerPage)}
            </Typography>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={page * itemsPerPage >= totalItems}
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Last10DaysTable;



















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { Paper } from '@mui/material';

// const Last10DaysTable = () => {
//   const [rows, setRows] = useState([]);
//   const [loading,setLoading] = useState(true);
//   const [columns] = useState([
//     { field: 'domainName', headerName: 'Domain Name', width: 250 },
//     { field: 'ip', headerName: 'IP', width: 250 },
//     { field: 'inactiveDate', headerName: 'Inactive Date', width: 180 },
//     { field: 'status', headerName: 'Status', width: 120 },
//     { field: 'queriesLast10Days', headerName: 'Queries (Last 10 Days)', type: 'number', width: 200 },
//   ]);


//   useEffect(() => {
//     axios.get('https://typo.coednssecurity.in:5001/nonoperationaldomain10days')
//       .then((response) => {
//         const processedData = [];
//         let rowId = 0;

      
//         response.data.data.forEach((domain) => {
//           if (domain.fqdn && Array.isArray(domain.ip_info)) {
//             const { fqdn, ip_info, first_inactive_date } = domain;

          
//             ip_info.forEach((ipData, index) => {
//               processedData.push({
//                 id: rowId++, 
//                 domainName: index === 0 ? fqdn : '', 
//                 ip: ipData.ip,
//                 inactiveDate: ipData.first_inactive_date,
//                 status: ipData.status,
//                 queriesLast10Days: ipData.query_count_last_10_days,
//               });
//             });
//           }
//         });

//         setRows(processedData);
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the data!", error);
//         setLoading(true);
//       });
//   }, []);

//   return (
//     <>
//     <div>
//         <h1>
//           Domain which became out of operation in last 10 days
//         </h1>
//     </div>
    
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <div style={{ height: 800, width: '100%' }}>
//         {loading ? (
//             <div>
//                 loading......
//             </div>
         
//         ) : (
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={10} 
//             rowsPerPageOptions={[5, 10, 25]} 
//             disableSelectionOnClick 
//           />
//         )}
//       </div>
//     </Paper>
//     </>
//   );
// };

// export default Last10DaysTable;
