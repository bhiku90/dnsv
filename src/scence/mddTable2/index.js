import React, { useState } from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function MddTable2({data, onClientIpClick, onBack,loading}) {
    console.log("loading value is ##############",loading)
   
    const theme = useTheme();
    const [selectedIpData, setSelectedIpData] = useState(null);
    

    console.log("Table2Data###############=",data);
    
    const rows = Object.entries(data.data).map(([ip, queryData], index) => ({
        id: index,
        clientIp: ip,
        sumQueries: queryData.ipTotal || 0, // Use ipTotal from aggregated data
    }));

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "clientIp",
            headerName: "Client IP Address",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', lineHeight: 'normal' }} onClick={() => handleIpCellClick(params.value)}>{params.value}</div>
            ),
        },
        {
            field: "sumQueries",
            headerName: "Number of queries(last 7 days)",
            flex: 1
        },
    ];

    

    const handleIpCellClick = (ip) => {
    
        console.log("Clicked IP:", ip);
        onClientIpClick(ip); // Pass the clicked IP to the parent
       
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
    <Box m="20px">
        {/* <Header subtitle={`Data For IP: ${''}`}/> */}
        <button onClick={onBack}>Back to Chart</button>
        <Box m="40px 0 0 0" height="75vh">
            <DataGrid rows={rows} columns={columns}/>
        </Box>
    </Box>
  )
}

export default MddTable2;