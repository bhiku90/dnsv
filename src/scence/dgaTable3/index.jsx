import React from 'react';
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function DgaTable3({ data, onBack }) {
    console.log("Table3Data###############=", data);



    const rows = [];
Object.entries(data).forEach(([ip, details], ipIndex) => {
    const { dates, queryCounts } = details;
    dates.forEach((date, dateIndex) => {
        Object.entries(queryCounts).forEach(([queryType, count], queryIndex) => {
            rows.push({
                id: `${ipIndex}-${dateIndex}-${queryIndex}`, // Unique row ID
                ip,
                last7daysDate: date,
                queryType,
                count,
            });
        });
    });
});


    // Define the columns
    const columns = [
        {
            field: "last7daysDate",
            headerName: "Date (Last 7 Days)",
            flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', lineHeight: 'normal',cursor:'pointer' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: "ip",
            headerName: "IP Address",
            flex: 1,
        },
        {
            field: "queryType",
            headerName: "Query Type",
            flex: 1,
        },
        {
            field: "count",
            headerName: "Count",
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <button onClick={onBack}>Back to Chart</button>
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid rows={rows} columns={columns} />
            </Box>
        </Box>
    );
}

export default DgaTable3;
