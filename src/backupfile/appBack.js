import { useState,useEffect } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scence/global/Topbar";
import Sidebar from "./scence/global/Sidebar";
import Dashboard from "./scence/dashboard";
import TwentyfourHoursTable from "./scence/24HoursTable";
import Bar from "./scence/bar";
import Line from "./scence/line";
import Tree from "./scence/tree";
import HoriBar from "./scence/horibar";
import NxBar from "./scence/nxbar";
import Nxdata from "./components/Nxdata";
import TreeMapChart from "./components/dynamics";
import BarChartDga from "./components/BarChartDga";
import BarDga from "./scence/dgabar";
import { DashboardCustomize } from "@mui/icons-material";
import Last5DaysTable from "./scence/DynamicTable/Last5days";
import DnsRecordChangedTable from "./scence/DynamicTable/DnsRecordChangedTable ";
import NewIpTable from "./scence/DynamicTable/NewIpTable";
import NonOperationalTable from "./scence/DynamicTable/NonOperationalTable";
import OperationalTable from "./scence/DynamicTable/OperationalTable";
//import { useState,useEffect } from "react";
import { fetchApiData7daysDga,fetchApiData7daysnxDomain} from './data/mockData'



function App() {
  const [theme, colorMode] = useMode();
  const [dgaSum, setDgaSum] = useState(null);
  const [dgaLoading, setDgaLoading] = useState(true);
  const [nxSum, setNxSum] = useState(null);
  const [nxData,setnxData] = useState(null)
  const [nxLoading, setNxLoading] = useState(true);





  const formatValue = (value) => {

    const roundToTwoDecimalPlaces = (num) => Math.round(num * 100) / 100;
    if (value == 0) {
      return value; 
    }
    if (value < 1000) {
      return value; 
    } else if (value >= 1000 && value < 100000) {
      const roundedValue = roundToTwoDecimalPlaces(value / 1000); 
      return `${roundedValue}k`; 
    } else if (value >= 100000 && value < 1000000) {
      const roundedValue = roundToTwoDecimalPlaces(value / 1000); 
      return `${roundedValue}k`;
    } else {
      const roundedValue = roundToTwoDecimalPlaces(value / 1000000); 
      return `${roundedValue}M`;
    }
  };
  const fetchDgaData = async () => {
    try {
      const dgaData = await fetchApiData7daysDga();
      console.log("DGA data:", dgaData);

      const sum = Object.values(dgaData.data).reduce((acc, value) => acc + value, 0);
      console.log("Calculated sum:", sum);

      const formattedSum = formatValue(sum);
      console.log("Formatted sum:", formattedSum);

      setDgaSum(formattedSum);
    

      setDgaLoading(false);
    } catch (error) {
      console.error("Error fetching DGA data:", error);
      setDgaLoading(false);
    }
  };


  const fetchNxData = async () => {
    try {
      const nxData = await fetchApiData7daysnxDomain();
      setnxData(nxData.data)


      const sum = Object.values(nxData.data).reduce((acc, value) => acc + value, 0);
      console.log("Calculated nx data:", nxData);

      const formattedSum = formatValue(sum);
      console.log("Formatted sum:", formattedSum);

      setNxSum(formattedSum);
     

      setNxLoading(false);
    } catch (error) {
      console.error("Error fetching DGA data:", error);
      setNxLoading(false);
    }
  };

  // UseEffect to fetch DGA data when the app mounts
  useEffect(() => {
    fetchDgaData();
    fetchNxData();
  }, []);

  

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <main className="content" style={{ flex: 1, overflow: "auto" }}>
            <Topbar />
            <Routes>
            <Route 
            path="/" 
            element={<Dashboard dgaSum={dgaSum} dgaLoading={dgaLoading} nxSum={nxSum} nxLoading={nxLoading} />} 
          />
              <Route path="/team" element={<TwentyfourHoursTable />} />
              <Route path="/bar" element={<Bar  />} />
              <Route path="/bardga" element={<BarDga />} />
              <Route path="/tree" element={<Tree />} />
              <Route path="/line" element={<Line />} />
              <Route path="/horibar" element={<HoriBar />} />
              <Route path="/nxbar" element={<NxBar nxdata={nxData} nxLoading={nxLoading} />} />
              <Route path="/nxdata" element={<Nxdata />} />
              <Route path="/dynamics" element={<TreeMapChart />} />
              <Route path="/last5days" element={<Last5DaysTable />} />
              <Route path="/dnsrecordchangedtable" element={<DnsRecordChangedTable />} />
              <Route path="/newiptable" element={<NewIpTable />} />
              <Route path="/nonoperationaltable" element={<NonOperationalTable />} />
              <Route path="/operationaltable" element={<OperationalTable />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;



return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DgaProvider>
        <div className="app" style={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <main className="content" style={{ flex: 1, overflow: "auto" }}>
            <Topbar />
            <Routes>
            <Route 
            path="/" 
            element={<Dashboard />} 
          />
              <Route path="/team" element={<TwentyfourHoursTable />} />
              <Route path="/bar" element={<Bar  />} />
              <Route path="/bardga" element={<BarDga />} />
              <Route path="/tree" element={<Tree />} />
              <Route path="/line" element={<Line />} />
              <Route path="/horibar" element={<HoriBar />} />
              <Route path="/nxbar" element={<NxBar  />} />
              <Route path="/nxdata" element={<Nxdata />} />
              <Route path="/dynamics" element={<TreeMapChart />} />
              <Route path="/last5days" element={<Last5DaysTable />} />
              <Route path="/dnsrecordchangedtable" element={<DnsRecordChangedTable />} />
              <Route path="/newiptable" element={<NewIpTable />} />
              <Route path="/nonoperationaltable" element={<NonOperationalTable />} />
              <Route path="/operationaltable" element={<OperationalTable />} />

            </Routes>
          </main>
        </div>
        </DgaProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
