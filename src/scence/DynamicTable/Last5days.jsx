import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, CircularProgress, Typography, Paper } from '@mui/material';

const Last5DaysTable = () => {
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
      const response = await axios.get('https://typo.coednssecurity.in:5001/recentqueriedlast5days'
      );

      const processedData = [];
      let rowId = (currentPage - 1) * itemsPerPage; 
      let srno = 1;

      response.data.data.forEach((domain) => {
        if (domain.fqdn && domain.ip_info) {
          const { fqdn, ip_info } = domain;

          if (Array.isArray(ip_info) && ip_info.length > 0) {
            ip_info.forEach((ipData, index) => {
              processedData.push({
                srno:srno++,
                id: rowId++,
                domainName: index === 0 ? fqdn : '',
                ip: ipData.ip,
                date: ipData.first_query_date,
                status: ipData.status,
                queryCount: ipData.query_count_last_5_days,
              });
            });
          } else {
            console.warn(`No IP info for domain: ${fqdn}`);
          }
        }
      });

      setRows(processedData);
      setTotalItems(response.data.totalCount); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.');
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
    { field: 'ip', headerName: 'IP', width: 180 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'queryCount', headerName: 'No. of Queries', type: 'number', width: 180 },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Domain queried for the first time in the last 5 days
      </Typography>
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
          <CircularProgress />
          <Typography variant="h6">Loading data...</Typography>
        </Box>
      ) : error ? (
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

export default Last5DaysTable;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { Paper } from '@mui/material';

// const Last5DaysTable = () => {
//   const [rows, setRows] = useState([]);
//   const [loading,setLoading] = useState(true);
//   const [columns] = useState([
//     { field: 'domainName', headerName: 'Domain Name', width: 250 },
//     { field: 'ip', headerName: 'IP', width: 180 },
//     { field: 'date', headerName: 'Date', width: 150 },
//     { field: 'status', headerName: 'Status', width: 120 },
//     { field: 'queryCount', headerName: 'No. of Queries', type: 'number', width: 180 },
//   ]);


//   useEffect(() => {
//     axios.get('https://typo.coednssecurity.in:5001/recentqueriedlast5days')
//       .then((response) => {
//         const processedData = [];
//         let rowId = 0;

        
//         response.data.data.forEach((domain) => {
//           if (domain.fqdn && domain.ip_info) {
//             const { fqdn, ip_info } = domain;

//             if (Array.isArray(ip_info) && ip_info.length > 0) {
//               ip_info.forEach((ipData, index) => {
//                 processedData.push({
//                   id: rowId++, 
//                   domainName: index === 0 ? fqdn : '', 
//                   ip: ipData.ip,
//                   date: ipData.first_query_date,
//                   status: ipData.status,
//                   queryCount: ipData.query_count_last_5_days,
//                 });
//               });
//             } else {
//               console.warn(`No IP info for domain: ${fqdn}`);
//             }
//           }
//         });

//         setRows(processedData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the data!", error);
//         setLoading(true);
//       });
//   }, []);

//   return (
//     <>
//        <div>
//         <h1>
//             Domain quried for the first ime in last 5 days.
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

// export default Last5DaysTable;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { Paper } from '@mui/material';

// const Last5DaysTable = () => {
//   const [rows, setRows] = useState([]);
//   const [columns] = useState([
//     { field: 'domainName', headerName: 'Domain Name', width: 250 },
//     { field: 'ip', headerName: 'IP', width: 180 },
//     { field: 'date', headerName: 'Date', width: 150 },
//     { field: 'status', headerName: 'Status', width: 120 },
//     { field: 'queryCount', headerName: 'No. of Queries', type: 'number', width: 180 },
//   ]);

 
//   useEffect(() => {
//     axios.get('https://typo.coednssecurity.in:5001/recentqueriedlast5days')
//       .then((response) => {
//         const processedData = [];

        
//         response.data.data.forEach((domain) => {
       
//           if (domain.fqdn && domain.ip_info) {
//             const { fqdn, ip_info } = domain;

//             if (Array.isArray(ip_info) && ip_info.length > 0) {
//               ip_info.forEach((ipData, index) => {
//                 processedData.push({
//                   id: `${fqdn}-${index}`,
//                   domainName: fqdn,
//                   ip: ipData.ip,
//                   date: ipData.first_query_date,
//                   status: ipData.status,
//                   queryCount: ipData.query_count_last_5_days,
//                 });
//               });
//             } else {
//               console.warn(`No IP info for domain: ${fqdn}`);
//             }
//           }
//         });

//         setRows(processedData);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the data!", error);
//       });
//   }, []);

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <div style={{ height: 800, width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={10} 
//           rowsPerPageOptions={[5, 10, 25]} 
//           disableSelectionOnClick 
//         />
//       </div>
//     </Paper>
//   );
// };

// export default Last5DaysTable;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { Paper } from '@mui/material';

// const Last5DaysTable = () => {
//   const [data, setData] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [columns, setColumns] = useState([
//     { field: 'domainName', headerName: 'Domain Name', width: 250 },
//     { field: 'ip', headerName: 'IP', width: 180 },
//     { field: 'date', headerName: 'Date', width: 150 },
//     { field: 'status', headerName: 'Status', width: 120 },
//     { field: 'queryCount', headerName: 'No. of Queries', type: 'number', width: 180 },
//   ]);


//   useEffect(() => {
//     axios.get('https://typo.coednssecurity.in:5001/recentqueriedlast5days')
//       .then((response) => {
//         console.log('API Response:', response.data);
//         const processedData = [];
//         response.data.data.forEach((domain) => {
//           const { fqdn, ip_info } = domain;
//           ip_info.forEach((ipData, index) => {
//             processedData.push({
//               id: `${fqdn}-${index}`, 
//               domainName: fqdn,
//               ip: ipData.ip,
//               date: ipData.first_query_date,
//               status: ipData.status,
//               queryCount: ipData.query_count_last_5_days,
//             });
//           });
//         });
//         setRows(processedData);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the data!", error);
//       });
//   }, []);

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={10} 
//           rowsPerPageOptions={[5, 10, 25]} 
//         />
//       </div>
//     </Paper>
//   );
// };

// export default Last5DaysTable;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';

// const Last5daysTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({ page: 0, pageSize: 10 });

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('https://typo.coednssecurity.in:5001/recentqueriedlast5days');
//         const rows = response.data.data.map((item,index) => ({
//           id: index,
//           domainName: item.fqdn,
//           queryCount: item.query_count_last_5_days,
        
//         }));
//         setData(rows);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const columns = [
//     { field: 'domainName', headerName: 'Domain Name', width: 200 },
//     { field: 'queryCount', headerName: 'No. of Queries', width: 160 },
//     { field: 'status', headerName: 'status ', width: 160 },
//   ];
//   if(loading)
//   {
//     return(
//       <div>Loading..</div>
//     );
//   }

//   return (
//     <div>
//       <h2>Total Input Domains</h2>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={data}
//           columns={columns}
//           pageSize={pagination.pageSize}
//           rowsPerPageOptions={[10, 25, 50]}
//           pagination
//           loading={loading}
//           page={pagination.page}
//           onPageChange={(newPage) => setPagination((prev) => ({ ...prev, page: newPage }))}
//         />
//       </div>
//     </div>
//   );
// };

// export default Last5daysTable;
