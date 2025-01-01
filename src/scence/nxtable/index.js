import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button,CircularProgress,Typography,Box } from '@mui/material';
import { fetchApiDataClientIpnxDomain } from '../../data/mockData'; 
import DomainDetail from '../../DomainDetail';


const DomainTable = ({selectedDate,onBack}) => {
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(100);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDomainData, setSelectedDomainData] = useState(null);
    const [viewDetail, setViewDetail] = useState(false); // New state variable for view toggle
  
    const loadData = async (page) => {
      setLoading(true);
      setError(null);
      try {
        const rawData = await fetchApiDataClientIpnxDomain(selectedDate,page, itemsPerPage);
        const transformedData = transformData(rawData);
        setTableData(transformedData);
        setTotalItems(Object.keys(rawData).length);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    const transformData = (rawData) => {
      const data = [];
  
      Object.entries(rawData).forEach(([domain, queries]) => {
        const queryEntries = Object.entries(queries).filter(([key]) => key !== 'domaincount');
        const queryTypes = {};
        queryEntries.forEach(([_, value]) => {
          Object.entries(value).forEach(([queryType, count]) => {
            queryTypes[queryType] = (queryTypes[queryType] || 0) + count;
          });
        });
  
        Object.entries(queryTypes).forEach(([queryType, count], index) => {
          data.push({
            id: `${domain}-${queryType}`,
            domain: index === 0 ? domain : '',
            queryType,
            count,
            queries, 
          });
        });
      });
  
      return data;
    };
  
    useEffect(() => {
      loadData(page);
    }, [selectedDate,page]);
  
    const handleDomainClick = (params) => {
      const domainQueries = tableData.find(item => item.id === params.id)?.queries;
      setSelectedDomainData(domainQueries);
      setViewDetail(true); 
    };
  
    const columns = [
      { field: 'domain', headerName: 'Domain Name', flex: 1, renderCell: (params) => (
        <Button onClick={() => handleDomainClick(params)} style={{ color: 'white', fontWeight: 'italic' }}>{params.value}</Button>
      ) },
      { field: 'queryType', headerName: 'Query Type', flex: 1 },
      { field: 'count', headerName: 'Count', flex: 1 },
    ];
  
    const handleBack = () => {
      setViewDetail(false); 
      setSelectedDomainData(null); 
    };
  
    return (
      <Box sx={{ height: 800, width: '100%', padding: '20px' }}>
      <h1>Domain Data for {selectedDate}</h1>
        <Button variant="contained" color="primary" onClick={onBack}>
             Back to chart
         </Button>
        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <CircularProgress />
            <Typography variant="h6">Loading data...</Typography>
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : (
          <>
            {viewDetail ? (
              <DomainDetail domainData={selectedDomainData} BacktoChart={handleBack} />

            ) : (
                <>
              <div style={{ height: 800, width: '100%' }}>
                <DataGrid
                  rows={tableData}
                  columns={columns}
                  pageSize={itemsPerPage}
                  rowsPerPageOptions={[itemsPerPage]}
                  pagination
                  disableSelectionOnClick
                />
              </div>
              <div>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1} variant="contained" color="primary">
              Previous
            </Button>
            <Button onClick={() => setPage(page + 1)} disabled={page * itemsPerPage >= totalItems} variant="contained" color="primary">
              Next
            </Button>
              </div>
              </>
              
            )}
            
          </>
        )}
      </Box>
    );
  };
  
  export default DomainTable;
  











// const DomainTable = ({ selectedDate,onBack }) => {
//     console.log("table date is",selectedDate)
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const itemsPerPage = 50;

//     const loadData = async (page) => {
//         setLoading(true);
//         try {
//             const { formattedData, totalPages } = await fetchApiDataClientIpnxDomain( selectedDate,page, itemsPerPage); 
//             setData(formattedData);
//             console.log("data is",data);
//             setTotalPages(totalPages);
//         } catch (error) {
//             console.error('Failed to load data', error);
//         } finally {
//             setLoading(false);
//         }
//     };
  

//     useEffect(() => {
//         if (selectedDate) {
//             loadData(page);
//         }
//     }, [selectedDate, page]);

//     const handleNext = () => {
//         if (page < totalPages) setPage(page + 1);
//     };

//     const handlePrev = () => {
//         if (page > 1) setPage(page - 1);
//     };

//     const columns = [
//         { field: 'domain', headerName: 'Domain Name', width: 200 },
//         { field: 'type', headerName: 'Query Type', width: 150 },
//         { field: 'count', headerName: 'Count', width: 100 },
//     ];

//     return (
//         <div>
//             <h1>Domain Data for {selectedDate}</h1>
//             <Button variant="contained" color="primary" onClick={onBack}>
//             Back to chart
//         </Button>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <div style={{ height: 800, width: '100%' }}>
//                     <DataGrid
//                         rows={data}
//                         columns={columns}
//                         pageSize={itemsPerPage}
//                         rowsPerPageOptions={[itemsPerPage]}
//                         pagination
//                         disableSelectionOnClick



//                     />
//                 </div>
//             )}
//             <div>
//                 <Button onClick={handlePrev} disabled={page === 1} variant="contained" color="primary" >Previous</Button>
//                 <span> Page {page} of {totalPages} </span>
//                 <Button onClick={handleNext} disabled={page === totalPages} variant="contained" color="primary" >Next</Button>
//             </div>
//         </div>
//     );
// };

// export default DomainTable;
