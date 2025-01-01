import { Box } from "@mui/material";
import Header from "../../components/Header";
import NxBarChartMal from "../../components/NxBarChart";
import DomainTable from "../nxtable";
//import MddTable1 from "../mddTables";
import { useState } from "react";

const NxBar = () =>{
    const [selectedDate, setSelectedDate] = useState(null);
   // const [showTable,setshowtable] = useState(false);
    const handleBarClick = (date) => {
        console.log("date is",date)
        setSelectedDate(date);
       // setshowtable(true);
    }; 
    const handleBack = () =>{
        setSelectedDate(null);

    }



    return(
        <Box>
            <Header title="Bar Chart for nx domain" subtitle="Simple Bar Chart"/>
            <Box height="75vh">
            {/* <NxBarChartMal onBarClick={handleBarClick} />  
            {showTable && <DomainTable selectedDate={selectedDate} />} */}
             {!selectedDate ? (
                    <NxBarChartMal onBarClick={handleBarClick} />    
                ):(
                    <DomainTable selectedDate={selectedDate} onBack={handleBack} />
                )};
                
              
            </Box>
        </Box>
    );
}

export default NxBar;