import { ColorModeContext,useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scence/global/Topbar";
import Sidebar from "./scence/global/Sidebar";
import Dashboard from "./scence/dashboard"
import TwentyfourHoursTable from "./scence/24HoursTable"
// import Invoices from "./scence/invoices"
// import Contacts from "./scence/contacts"
import Bar from "./scence/bar";
// import Form from "./scence/form"
import Line from "./scence/line";
import Tree from "./scence/tree";
import HoriBar from "./scence/horibar";
import NxBar from "./scence/nxbar";
import Nxdata from "./components/Nxdata";
import TreeMapChart from "./components/dynamics";
import BarChartDga from "./components/BarChartDga";
import BarDga from "./scence/dgabar";

// import Geography from "./scence/geography"

function App() {
const [theme,colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar/>
          <Routes>
            <Route path="/" element={<Bar/>} />
            <Route path="/team" element={<TwentyfourHoursTable />} />
            {/* <Route path="/contacts" element={<Contacts />} /> */}
            {/* <Route path="/invoices" element={<Invoices />} /> */}
            {/* <Route path="/form" element={<Form />} /> */}
            <Route path="/bar" element={<Bar />} />
            <Route path="/bardga" element={<BarDga />} />
            <Route path="/tree" element={<Tree />} />
            <Route path="/line" element={<Line />} />
            <Route path="/horibar" element={<HoriBar />} />
            <Route path="/nxbar" element={<NxBar />} />
            <Route path="/nxdata" element={<Nxdata />} />
            <Route path="/dynamics" element={<TreeMapChart />} />
            <Route path="/nxdata" element={<Nxdata />} />
            {/* <Route path="/geography" element={<Geography />} /> */}
          </Routes>
        </main>
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
