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
    const[loading,setLoading] = useState(true);
    const [domainName, setDomainName] = useState("");
    const[ip,setIP] = useState("")
    const [showChart, setShowChart] = useState(false);
   

    const handleBarClick = (barData) => {
        //setLoading(true);
        setSelectedBar(barData.data);
        setClickedDate(barData.date);
       
            setLoading(false); 
       
    };

    const handleDomainClick = async (domainData) => {
    
        await setSelectedDomain(domainData);
        setDomainName(domainData.domainName);
      
        
    };

    const handleClientIpClick = async (clickedIp) => {
        setIP(clickedIp)

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
        setShowChart(true)
    };

    const handleBackToChart = () => {
        setSelectedBar(null); 
        console.log("success")
        console.log("success",selectBar)
    };

    


    return (
        <Box>
            <Box height="75vh">
                {!selectBar || showChart ? (
                    <>
                    <Header title="Malicious Domains in Last 7 Days" />
                    
                    <BarChartMal onBarClick={handleBarClick} onBack={handleBackToChart}   />
                    </>
                ) : selectedClientIp ? (
                   <>
                    <Header title={`Number of queries for IP Address ${ip} in Last 7 Days`} />
                    <MddTable3 data={table3Data} onBack={handleBackToTable2} />
                   </>
                ) : selectedDomain ? (
                    <>
                    <Header title={`Requested IP Addresses For ${domainName} in Last 7 Days`} />
                    <MddTable2
                        data={selectedDomain}
                        onClientIpClick={handleClientIpClick}
                        onBack={handleBackToTable1}
                        loading={loading}
                    />
                    </>
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
