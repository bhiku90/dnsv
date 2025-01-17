import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button,CircularProgress,Typography,Box } from '@mui/material';
import { fetchApiDataClientIpnxDomain } from '../../data/mockData'; 
import DomainDetail from '../../DomainDetail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../../components/Header';




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
           <Header title={`NX Domains for ${selectedDate}`}></Header>

           <Button
                sx={{height:"30px"}}
                onClick={onBack}
                variant="outlined"
                color="info"
                startIcon={<ArrowBackIcon />}

            >
                Back
            </Button>
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
  
    return (
      <Box sx={{ height: 800, width: '100%', padding: '20px' }}>
      <div style={{display:"flex"}}>
      <Button
                sx={{height:"30px"}}
                onClick={onBack}
                variant="outlined"
                color="info"
                startIcon={<ArrowBackIcon />}

            >
                Back
            </Button>
      
      </div>
     

     
        
        { error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : (
          <>
            {viewDetail ? (
              <>
              <Header title={`NX Domains for ${selectedDate}`}></Header>
      
                 <DomainDetail domainData={selectedDomainData} BacktoChart={handleBack} />
                 </>
           

            ) : (
                <>
                 <Header title={`NX Domains for ${selectedDate}`}></Header>
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
  











