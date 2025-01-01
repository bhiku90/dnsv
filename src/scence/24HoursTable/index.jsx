import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

//import { mockHorBarData } from "../../data/mockData";
import Header from "../../components/Header";

const TwentyfourHoursTable = ({data,clickedIp,onBack}) =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const transformedData = Object.entries(data).map(([date, count], index) => ({
        id: `${index}`, // Unique row id based on the index
        date,          // Date (e.g., "2024-09-08 15")
        data: count,   // No of Requests (e.g., 2074)
    }));
    
    //console.log("newdata=",transformedData);

    const columns= [
        {
            field: "id", 
            headerName:"ID"
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "data",
            headerName: "No of Request",
            flex: 1,
            cellClassName: "name-column--cell",
        },
    ]

    return (
        <Box m="20px">
            <Header subtitle={`Data For IP: ${clickedIp}`}/>
            <button onClick={onBack}>Back to Chart</button>
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid rows={transformedData} columns={columns}/>
            </Box>
        </Box>
    );

}

export default TwentyfourHoursTable;