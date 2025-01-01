import { Box } from "@mui/material";
import Header from "../../components/Header";
import TreeChart from "../../components/TreeChart";

const Tree = () =>{
    return(
        <Box>
            <Header title="Tree Chart For Mal" subtitle="Simple Tree Chart"/>
            <Box height="75vh">
              <TreeChart />  
            </Box>
        </Box>
    );
}

export default Tree;