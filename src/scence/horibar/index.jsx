import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import HoriBarChartMal from "../../components/HoriBarChart";
import TwentyfourHoursTable from "../24HoursTable";
import LineChart from "../../components/LineChart";

const HoriBarMal = () => {
    const [selectedBar, setSelectedBar] = useState(null);
    const [clickedIp, setClickedIp] = useState(null);
    //const [onBack, setonBack] = useState(null);

    const handleBarClick = (barData, valIp) => {
        setSelectedBar(barData);
        setClickedIp(valIp);
    };
    //console.log("selectbar===",selectedBar);

    const handleBack = () => {
        setSelectedBar(null);
        setClickedIp(null);
    }

    return (
        <Box>
            <Header title="Client with more than 1000 queries in last 24 hours" />
            <Box height="75vh">
                {!selectedBar && !clickedIp ? (
                    <Box height="1000vh">
                    <HoriBarChartMal onBarClick={handleBarClick} />
                    </Box>
                ) : (
                    <Box height="75vh">
                         <LineChart data={{...selectedBar}} onBack={handleBack}/> 
                         <TwentyfourHoursTable data={{ ...selectedBar }} clickedIp={clickedIp} onBack={handleBack} /> 
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default HoriBarMal;