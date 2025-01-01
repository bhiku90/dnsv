import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
//import { mockHorBarData as data } from "../data/mockData";
import { useState, useEffect } from "react";
import {fetchApiData} from '../data/mockData';
import { TextField } from "@mui/material";


const HoriBarChart = ({ onBarClick,  }) =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectBar, setSelectedBar] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [minSum, setMinSum] = useState(1000);  //Default min range
    const [maxSum, setMaxSum] = useState(100000000);  //Default max range
    const [filteredData, setFilteredData] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
      const getData = async () => {
        setLoading(true);
        try {
          const data = await fetchApiData(); 
          
          
          setApiData(data.data);
          console.log("New Data",apiData);
        
          const initialFilteredData = Object.keys(data.data).map(ip => {
            const sum = Object.values(data.data[ip]).reduce((acc, val) => acc + val, 0);
            return { ip, sum };
          }).filter(item => item.sum >= minSum && item.sum <= maxSum);
          setLoading(false);
  
          setFilteredData(initialFilteredData);
        } catch (error) {
          console.error("Error fetching data for the chart :", error.message);
        }
      };
      getData();
    }, [minSum, maxSum]);

    console.log("new Data---",apiData);
   // funtion for collecting data
    const filterDataByRange = () => {
      const filtered = Object.keys(apiData).map(ip => {
        const sum = Object.values(apiData[ip]).reduce((acc, val) => acc + val, 0);
        return { ip, sum };
      }).filter(item => item.sum >= minSum && item.sum <= maxSum);
  
      setFilteredData(filtered);  //Update the filtered data
    };
  
    // Handle range input change
    const handleMinChange = (e) => setMinSum(Number(e.target.value));
    const handleMaxChange = (e) => setMaxSum(Number(e.target.value));
    
    //console.log("New HOR values===", HorData);
    const nivoColors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3'];

    const getNivoColor = (sum) => {
        if (sum < 10000) {
          //console.log("sum",sum);
          return nivoColors[0]; // Light Green
        } else if (sum >= 30000 && sum < 40000) {
          return nivoColors[1]; // Orange
        } else if (sum >= 50000 && sum < 80000) {
          return nivoColors[2]; // Light Blue
        } else {
          return nivoColors[3]; // Pink
        }
      };

    const getPatternId = (sum) => {
        if (sum < 50000) {
          return 'dots';
        } else if (sum >= 20000 && sum < 30000) {
          return 'lines';
        }
        return null; // No pattern for other sums
      };

      const handleBarClick = (bar) => {
        const clickedIp = bar.indexValue;
        console.log("new data clickedIp---",clickedIp);
        console.log("new data---",apiData );
        setSelectedBar(apiData[clickedIp]); // Store the selected IP's data
       
        onBarClick(apiData[clickedIp], clickedIp); // Pass selected data to parent component   
      }
     
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
                <div style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' ,justifyContent:"center",alignItems:"center",display: 'flex', }}>
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
    

    return(
        <>

        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px'  }}>
          <TextField
            label="Min Value"
            variant="outlined"
            value={minSum}
            onChange={handleMinChange}
            style={{ marginLeft: '20px' }}
          />
          <TextField
            label="Max Value"
            variant="outlined"
            value={maxSum}
            onChange={handleMaxChange}
            style={{ marginRight: '100px' }}
          />
          
        </div>

        <ResponsiveBar
        data={filteredData}
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
        keys={["sum"]}
        indexBy="ip"
        margin={{ top: 50, right: 40, bottom: 50, left: 100 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ data }) => getNivoColor(data.sum)}
        defs={[
            {
                id: 'ip',
                //type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 40,
                padding: 1,
                stagger: true
            },
            {
                id: 'ip',
                //type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={filteredData.map((bar) => {
            const patternId = getPatternId(bar.sum);
            return patternId
              ? {
                  match: { id: bar.ip },
                  id: patternId,
                }
              : null
          }).filter(Boolean)} // Remove null patterns
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
            tickSize: 10,
            tickValues: 100,
            tickPadding: 5,
            tickRotation: 60,
            legend: 'Total Sum',
            legendPosition: 'middle',
            legendOffset: 40,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 2,
            tickRotation: 0,
            legend: 'IP Address',
            legendPosition: 'middle',
            legendOffset: -50,
            truncateTickAt: 0
        }}
        enableGridY={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
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
        ariaLabel="IP bar Chart Demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" for IP: "+e.indexValue}
           
    />
     
    </>
    );
}

export default HoriBarChart;