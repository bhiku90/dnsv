import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Button, CircularProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';

const NonOperationalTable = ({onBack}) => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const navigate=useNavigate();
    const handleBack =(path)=>{
      navigate(path);
    }

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
              srno:index === 0 ? srno++ : '',
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
      
   <Header title="Domains Out of Operation in the Last 10 Days"></Header>
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
    <Box sx={{ width: '100%', padding: '20px' }}>
     
   <Header title="Domains Out of Operation in the Last 10 Days"></Header>
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
    
      {error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : (
        
          <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ height: 800, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={itemsPerPage}
                disableSelectionOnClick
              />
            </div>
          </Box>
          
        
      )}
    </Box>
  );
};

export default NonOperationalTable;



















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
