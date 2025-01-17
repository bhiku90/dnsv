import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChartDga from "../../components/BarChartDga";
import DgaTable1 from "../dgaTable1";
import DgaTable2 from "../dgaTable2";
import DgaTable3 from "../dgaTable3";
import { useState } from "react";



const BarDga = ({dgaData,dgaLoading,upm}) => {
    
    const [selectBar, setSelectedBar] = useState(null);
    const [clickedDate, setClickedDate] = useState(null);
    const [selectedDomain, setSelectedDomain] = useState(null);
    const [selectedClientIp, setSelectedClientIp] = useState(null);
    const [table3Data, setTable3Data] = useState(null);
    const [domainName, setDomainName] = useState("");
    const[ip,setIP] = useState("")

    const handleBarClick = (barData) => {
        setSelectedBar(barData.data);
        setClickedDate(barData.date);
    };

    const handleDomainClick = async (domainData) => {
        setSelectedDomain(domainData);
        setDomainName(domainData.domainName);
    };

    const handleClientIpClick = async (clickedIp) => {
        setIP(clickedIp)
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
           
            <Box height="75vh">
                {!selectBar ? (
                    <>
                     <Header title="DGA Domain in Last 7 days"  />
                     <BarChartDga onBarClick={handleBarClick} dgaData={dgaData}  dgaLoading={dgaLoading} upm={upm}/></>
                ) : selectedClientIp ? (
                    <>
                    <Header title={`Number of queries for IP Address ${ip} in Last 7 Days`} />
                    <DgaTable3 data={table3Data} onBack={handleBackToTable2} />
                    </>
                ) : selectedDomain ? (
                    <>
                      <Header title={`Requested IP Addresses For ${domainName} in Last 7 Days`} />
                    <DgaTable2
                        data={selectedDomain}
                        onClientIpClick={handleClientIpClick}
                        onBack={handleBackToTable1}
                    /></>
                  
                ) : (

                    <DgaTable1
                        data={selectBar}
                        clickedDate={clickedDate}
                        onDomainClick={handleDomainClick}
                        onBack={handleBackToChart}
                    />
                )}
            </Box>
        </Box>
    );
};

export default BarDga;
