import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChartMal from "../../components/BarChartMal";
import MddTable1 from "../mddTables";
import MddTable2 from "../mddTable2";
import MddTable3 from "../mddTable3";
import { useState } from "react";



const BarMal = () => {
    const [selectBar, setSelectedBar] = useState(null); 
    const [clickedDate, setClickedDate] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedClientIp, setSelectedClientIp] = useState(null);
    const [table3Data, setTable3Data] = useState(null);
    const[loading,setLoading] = useState(true)

    const handleBarClick = (barData) => {
        //setLoading(true);
        setSelectedBar(barData.data);
        setClickedDate(barData.date);
       
            setLoading(false); 
       
    };

    const handleDomainClick = async (domainData) => {
       
        
      await setSelectedDomain(domainData);
      
        
    };

    const handleClientIpClick = async (clickedIp) => {
        console.log("Client IP clicked for Table2:", clickedIp);
        const filteredData = selectedDomain.data[clickedIp];
        setSelectedClientIp(clickedIp);
        setTable3Data({ [clickedIp]: filteredData });
    };

    const handleBackToTable2 = () => {
        setSelectedClientIp(null);
        setTable3Data(null);
    };

    const handleBackToTable1 = () => {
        setSelectedDomain(null); 
    };

    const handleBackToChart = () => {
        setSelectedBar(null); 
    };

    return (
        <Box>
            <Header title="Malicious Domains in Last 7 Days" sx={{}}/>
            <Box height="75vh">
                {!selectBar ? (
                    <BarChartMal onBarClick={handleBarClick} />
                ) : selectedClientIp ? (
                    <MddTable3 data={table3Data} onBack={handleBackToTable2} />
                ) : selectedDomain ? (
                    <MddTable2
                        data={selectedDomain}
                        onClientIpClick={handleClientIpClick}
                        onBack={handleBackToTable1}
                        loading={loading}
                    />
                ) : (
                    <MddTable1
                        data={selectBar}
                        clickedDate={clickedDate}
                        onDomainClick={handleDomainClick}
                        onBack={handleBackToChart}
                        loading={loading}
                    />
                )}
            </Box>
        </Box>
    );
};

export default BarMal;
