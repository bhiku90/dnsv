import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { fetchApiData7daysMdd, fetchApiDataMddDomain } from "../data/mockData";
import { useState, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

import { fetchApiData7daysDga } from "../data/mockData";


const BarChartMal = ({isDashboard = false, onBarClick, onBack,}) =>{

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const[loading,setLoading] = useState(true);
    const [mddapidata, setmddapiData] = useState([]);
    const [clickedDateData, setClickedDateData] = useState(null);
    const[upm,setUpm] = useState(false);

    useEffect(() =>{
   
      const getMddData = async () =>{
        setLoading(true)
        setUpm(false)
        try {
        const mddData = await fetchApiData7daysMdd();
        
     
        setLoading(false)

        if(mddData.status == "UPM")
        {
          setUpm(true)
        }
        else{
          setmddapiData(mddData.data);
        }
        }catch (error){
          setLoading(true)

        
        } 
      
      }
      getMddData();
    },[])

    console.log("data=",mddapidata);
    const sum = Object.values(mddapidata).reduce((acc, value) => acc + value, 0);
    
   

console.log(sum); // Output: 364
    const modifiedData = Object.entries(mddapidata).map(([key, value]) => {
        return { key,value };
    });
  

    const nivoColors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3'];

    const getNivoColor = (val) => {
        //console.log(val)
        if (val >= 100 && val <=200) {
          return nivoColors[0]; // Light Green
        } else if (val >= 50 && val <=100) {
          return nivoColors[1]; // Orange
        } else if (val >= 300 && val<=350) {
          return nivoColors[2]; // Light Blue
        } else {
          return nivoColors[3]; // Pink
        }
      }


      const handleBarClick = async (bar) => {
       
        const clickedDate = bar.indexValue; // 'key' is the date in this case
   
       

    
        try {
          setUpm(false)
          setLoading(true);
          //Make API call with the clicked date
          const response = await fetchApiDataMddDomain(clickedDate);
          console.log("response data is",response)
          if(response.status=="UPM")
          {
            setLoading(false)
            setUpm(true);
           
          }
          else{
            setClickedDateData(response);
            onBarClick({data: response.data, date: clickedDate});

          }

       
           //Store the response data from the clicked date
          
        } catch (error) {
          console.error("Error fetching data for clicked date:", error);
        }
      };
      if (loading) {
        const dotStyle = (delay) => ({
            animation: `blink 1.5s infinite`,
            animationDelay: `${delay}s`,
            opacity: 0,
        });
    
        const keyframes = `
            @keyframes blink {
                0%, 100% { opacity: 0; }
                50% { opacity: 1; }
            }
        `;
    
        return (
            <>
                <style>{keyframes}</style>
                <div style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' ,justifyContent:"center",alignItems:"center",display: 'flex',top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%', }}>
                    Loading
                    <span>
                        <span style={dotStyle(0.2)}>.</span>
                        <span style={dotStyle(0.4)}>.</span>
                        <span style={dotStyle(0.6)}>.</span>
                        <span style={dotStyle(0.8)}>.</span>
                    </span>
                </div>
            </>
        );
    }
    
    if(upm){
      return (

        <>
       
         <Button
                onClick={()=>{setUpm(false)}}
                variant="outlined"
                color="info"
                startIcon={<ArrowBackIcon />}
                sx={{ml:"20px"}}

            >
                Back
            </Button>
            <div style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' ,justifyContent:"center",alignItems:"center",display: 'flex', top: 0,
          left: 0,
          width: '100%',
          height: '100%',}}>
          Sorry..! Data is not avilable at the moment..!
         
      </div>

        
        </>
        
      )
      

  };

    return (
        <ResponsiveBar
        data={modifiedData}
        theme={{
            // added
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
                container: {
                  color: colors.primary[500],
                },
            },
          }}
        indexBy="key"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ data }) => getNivoColor(data.value)}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'Date',
            legendPosition: 'middle',
            legendOffset: 45,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'No of Request',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        onClick={handleBarClick}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
    );

}

export default BarChartMal;



