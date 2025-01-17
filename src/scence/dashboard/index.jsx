import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { tokens } from '../../theme';
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { fetchApiDataDynamics } from '../../data/mockData';
import { useEffect,useState,useRef,useContext } from "react";
import { fetchApiData7daysMdd, fetchApiData7daysDga,fetchApiData,fetchApiData7daysnxDomain} from "../../data/mockData";

const Dashboard = ({dgaSum,dgaLoading,nxSum,nxLoading}) => {
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); 
  const [salientData,setsalientData] = useState(null);
  const [mddSum,setMddSum]=useState(0);
  //const [dgaSum,setDgaSum]=useState(0);
  //const [nxSum,setNxSum]=useState(0);
  const [last24hourSum,setlast24HourSum]= useState(0);
  //const[dgaloading,setDgaLoading] = useState(true)
  //const[nxloading,setNxLoading] = useState(true)
  const fetchStatus = useRef(false);

  //const [dgaSum, setDgaSum] = useState(0);


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
  
 
  const handleBoxClick = (path) => {
    navigate(path);
  };
 

  useEffect(() => {
    
    
  
 
      getData();
      fetchSalientData();
      fetchMddData();
      //fetchDgaData();
      //fetchNxData();
      
    
      
    
  }, []);

    const fetchMddData = async () =>{
      
      try {
      const mddData = await fetchApiData7daysMdd();

      const sum = Object.values(mddData.data).reduce((acc, value) => acc + value, 0);
      
      setMddSum(formatValue(sum));

      console.log("mdd sum is",mddSum)
     }
     catch (error){
   

      
      } 
    
      }


      // const fetchDgaData = async () => {
       
      
      
      //   try {
        
      //     const dgaData = await fetchApiData7daysDga();
      //     console.log("DGA data:", dgaData);
    
        
      //     const sum = Object.values(dgaData.data).reduce((acc, value) => acc + value, 0);
      //     console.log("Calculated sum:", sum);
      
         
      //     const formattedSum = formatValue(sum);
      //     console.log("Formatted sum:", formattedSum);
      
        
      //     setDgaSum(formattedSum);
      
      //     localStorage.setItem('dgaSum', JSON.stringify(formattedSum));
      //     localStorage.setItem('dgaFetched', 'true');
      
         
      //     setDgaLoading(false);
      
      //   } catch (error) {
      //     console.error("Error fetching DGA data:", error);
      //   } finally {
       
      //     setDgaLoading(false);
      //   }
      // };
      


        // const fetchNxData = async () =>{
      
      
        //   try {
            
        //   const NxData = await fetchApiData7daysnxDomain();
       
        //   const sum = Object.values(NxData.data).reduce((acc, value) => acc + value, 0);
        //   console.log("sum is",sum)
        //   setNxSum(formatValue(sum));
        //   console.log("dga sum is",dgaSum)
  
        //   setNxLoading(false)
         

        //  }
        //  catch (error){
         
          
        //   } 
        //   finally{
            
        //   }
        
        //   }
  






        const getData = async () => {
         
          try {
              
              const data = await fetchApiData();


            

              const initialFilteredData = Object.keys(data.data).map(ip => {
                  const sum = Object.values(data.data[ip]).reduce((acc, val) => acc + val, 0);
                  return { ip, sum };
              }).filter(item => item.sum >= 1000  );


              const sum=initialFilteredData.length;
              setlast24HourSum(sum);

           
          console.log("the 24 hour data",initialFilteredData)

             
          } catch (error) {
              console.error("Error fetching data for the chart :", error.message);
          }
      };






    const fetchSalientData = async () => {
      
      try {
        const responseData = await fetchApiDataDynamics();

          
          const data =  [
            { recentqueriedlast5days: responseData.recentqueriedlast5days},
            { newipslast10days: responseData.newipslast10days },
            {operationaldomain10days:  responseData.operationaldomain10days },
            {nonoperationaldomain10days :  responseData.nonoperationaldomain10days },
            {dnsrecordlast10:responseData.dnsrecordlast10},
            {newlyreglast10:responseData.newlyreglast10},
         ];


      
        const modifiedData = data.map(item => {
          const key = Object.keys(item)[0];
          const value = item[key];
         
          return { [key]: formatValue(value) };
        });


        const dataObject = modifiedData.reduce((acc, item) => {
          const key = Object.keys(item)[0]; 
          acc[key] = item[key]; 
          return acc;
        }, {});
        
                 

         setsalientData(dataObject)
 
      
       
        }catch (error) {
          console.error('Error fetching data:', error);
        }

       
      } 
 

  

  return (
    <Box m="50px"
    sx={{ 
      overflowX: 'hidden',
      maxWidth: '100%'      
    }}
   
    
    >
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
       
      >
        {/* ROW 1 */}
        <Box
  gridColumn="span 3"
  backgroundColor={colors.primary[400]}
  display="flex"
  alignItems="center"
  justifyContent="center"
  onClick={() => handleBoxClick('/bar')} 
  sx={{
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)',
      border: '2px solid rgb(162, 167, 235)',
      
    },
  }}
>
  <Box className="innerBox"> 
    <Typography
      variant="h5"
      fontWeight="600"
      color={colors.grey[100]}
    >
      Total Malicious Domains
    </Typography>
    <Typography
      variant="h5"
      fontWeight="600"
      color={colors.grey[100]}
    >
         <span style={{color:"yellow", fontSize:"30px", justifyContent:"center",alignContent:"center",display:"flex"}}>{mddSum}</span>
    </Typography>
  </Box>
</Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          sx={{
            transition: 'all 0.3s ease', 
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)',
              border: '2px solid rgb(162, 167, 235)',
              
            },
         
          }}
       
          justifyContent="center"
          onClick={() => handleBoxClick('/horibar')} 
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              Clients with more than 1000 queries
            </Typography>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
            <span style={{color:"yellow", fontSize:"30px", justifyContent:"center",alignContent:"center",display:"flex"}}>{last24hourSum}</span>
            </Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            transition: 'all 0.3s ease', 
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)', 
               border: '2px solid rgb(162, 167, 235) ',
               '.innerBox .MuiTypography-h5 ': { 
                fontSize: '20px',
              },
            },
          }}
       
          onClick={() => handleBoxClick('/nxbar')} 
        >
          <Box
       
           
          
          >
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              Total NX Domains 
            </Typography>

            {nxLoading  ?  
            
            
            <CircularProgress  size={30} color="secondary" 
            sx={{ml:"20px",mt:"0px"}}
            
            
            
            ></CircularProgress> :
            
            <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
          >
           <span style={{color:"yellow",fontSize:"30px"}}>{nxSum}</span>
          </Typography>
 
            
            
            
            
            
            }
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            transition: 'all 0.3s ease', 
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)', 
               border: '2px solid rgb(162, 167, 235) ',
               '.innerBox .MuiTypography-h5 ': { 
                fontSize: '20px',
              },
            },
          }}
          onClick={() => handleBoxClick('/bardga')} 
        >
          <Box
       
          >
            <Typography
             
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              Total DGA Domains
            </Typography>


            {dgaLoading  ?  
            
            
           <CircularProgress  size={30} color="secondary" 
           sx={{ml:"20px"}}
           
           
           
           ></CircularProgress> :
           
           <Typography
           variant="h5"
           fontWeight="600"
           color={colors.grey[100]}
         >
          <span style={{color:"yellow",fontSize:"30px" }}>{dgaSum}</span>
         </Typography>

           
           
           
           
           
           }

          

            
            
          </Box>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          display="flex"
          alignItems="center"
          justifyContent="center"
         
      
          backgroundColor={colors.primary[400]}
          onClick={() => handleBoxClick('/last5days')}
          sx={{
            cursor:"pointer",
            transition: 'all 0.3s ease', 
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)', 
               border: '2px solid rgb(162, 167, 235) '
            },
          }}
        
        >
          <Box
            mt="25px"
            p="0 30px"
          
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
            
            
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Domain which were queried for the First Time in Last 5 Days
              </Typography>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                sx={{ 
                  mt:"10px",
                 position: 'relative', 
                 top: '70%', 
                 transform: 'translateY(10%)' ,
                 transform: 'translateX(50%)' 
          }}
              >
                <span style={{color:"yellow", fontSize:"30px",marginLeft:"-50px"}}> {salientData?.recentqueriedlast5days}</span>
               
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
         
          onClick={() => handleBoxClick('/newiptable')} 
          sx={{
            cursor:"pointer",
            transition: 'all 0.3s ease', 
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)', 
               border: '2px solid rgb(162, 167, 235) '
            },
          }}
       
        >
          <Box
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600">
              Domain which started operating on new IP address in last 10 Days
            </Typography>
            <Typography variant="h5" fontWeight="600"
            
            sx={{ 
              mt:"10px",
             position: 'relative', 
             top: '70%', 
             transform: 'translateY(10%)' ,
             transform: 'translateX(50%)' 
      }}
      >
              <span style={{color:"yellow", fontSize:"30px",marginLeft:"-50px"}}>    {salientData?.newipslast10days}</span>
         
            </Typography>
          </Box>
          <Box height="250px">
            {/* <TreeChart isDashboard={true} /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            cursor:"pointer",
            transition: 'all 0.3s ease', 
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)', 
                border: '2px solid rgb(162, 167, 235) '
            },
          }}
       
          onClick={() => handleBoxClick('/operationaltable')} 
          
        >
          <Box
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600">
              Domains which became operational in last 10 days
            </Typography>
            <Typography variant="h5" fontWeight="600"
             sx={{ 
              mt:"10px",
             position: 'relative', 
             top: '70%', 
             transform: 'translateY(10%)' ,
             transform: 'translateX(50%)' 
      }}
            >
            <span style={{color:"yellow", fontSize:"30px",marginLeft:"-50px"}}>  {salientData?.operationaldomain10days}</span>
            
       
            </Typography>
          </Box>
          <Box height="250px">
            {/* <TreeChart isDashboard={true} /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            cursor:"pointer",
            transition: 'all 0.3s ease', 
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)', 
                border: '2px solid rgb(162, 167, 235) '
            },
          }}
          onClick={() => handleBoxClick('/nonoperationaltable')} 
        >
          <Box
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600">
              Domains which went out-of-operation in last 10 days
            </Typography>
            <Typography variant="h5" fontWeight="600"
             sx={{ 
              mt:"10px",
             position: 'relative', 
             top: '70%', 
             transform: 'translateY(10%)' ,
             transform: 'translateX(50%)' 
      }}
            >
              <span style={{color:"yellow", fontSize:"30px",marginLeft:"-50px"}}> {salientData?.nonoperationaldomain10days}</span>
            
            </Typography>
          </Box>
          <Box height="250px">
            {/* <TreeChart isDashboard={true} /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            cursor:"pointer",
            transition: 'all 0.3s ease', 
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)', 
                border: '2px solid rgb(162, 167, 235) '
            },
          }}
          onClick={() => handleBoxClick('/dnsrecordchangedtable')} 
        >
          <Box
            colors={colors.grey[100]}
            p="15px"
            
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h5" fontWeight="600">
              Domains which updated their Whois records in last 10 days

            </Typography>
            <Typography variant="h5" fontWeight="600" 
             sx={{ 
              mt:"10px",
             position: 'relative', 
             top: '70%', 
             transform: 'translateY(10%)' ,
             transform: 'translateX(50%)' 
      }} >
       <span style={{color:"yellow", fontSize:"30px",marginLeft:"-50px"}}>  {salientData?.dnsrecordlast10}
        </span>
              
            </Typography>
          </Box>
          <Box height="250px">
            {/* <TreeChart isDashboard={true} /> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            cursor:"pointer",
            transition: 'all 0.3s ease', 
            '&:hover': {
              boxShadow: '0px 4px 12px rgba(226, 37, 37, 0.1)', 
                border: '2px solid rgb(162, 167, 235) '
            },
          }}
          onClick={() => handleBoxClick('/recent-data')} 
        >
          <Box
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600">
              Domains which are newly registered in last 10 days
            </Typography>
            <Typography variant="h5" fontWeight="600"

sx={{ 
  mt:"10px",
 position: 'relative', 
 top: '70%', 
 transform: 'translateY(10%)' ,
 transform: 'translateX(50%)' 
}}
            >
             <span style={{color:"yellow", fontSize:"30px",marginLeft:"-50px"}}> {salientData?.newlyreglast10}</span>
              

            </Typography>
          </Box>
          <Box height="250px">
            {/* <TreeChart isDashboard={true} /> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;