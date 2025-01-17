import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
//import { mockHorBarData as data } from "../data/mockData";
import { useState, useEffect } from "react";
import { fetchApiData } from '../data/mockData';
import { TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import Header from "./Header";

const HoriBarChart = ({ onBarClick }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectBar, setSelectedBar] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [minSum, setMinSum] = useState(1000);  //Default min range
    const [maxSum, setMaxSum] = useState(100000000);  //Default max range
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('ascending'); 
    const[upm,setUpm] = useState(false);
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                setUpm(false)
                const data = await fetchApiData();


                setLoading(false);
                if(data.status == "UPM")
                {
                    setUpm(true)
                }
                else{
                    setApiData(data.data);
                }

                const initialFilteredData = Object.keys(data.data).map(ip => {
                    const sum = Object.values(data.data[ip]).reduce((acc, val) => acc + val, 0);
                    return { ip, sum };
                }).filter(item => item.sum >= minSum && item.sum <= maxSum);

             
                const sortedData = sortData(initialFilteredData, sortOrder);
                setFilteredData(sortedData);
               
            } catch (error) {
                console.error("Error fetching data for the chart :", error.message);
            }
        };
        getData();
    }, [minSum, maxSum, sortOrder]);

    
    const sortData = (data, order) => {
        return data.sort((a, b) => {
            if (order === 'ascending') {
                return a.sum - b.sum;
            } else {
                return b.sum - a.sum;
            }
        });
    };

    const handleMinChange = (e) => setMinSum(Number(e.target.value));
    const handleMaxChange = (e) => setMaxSum(Number(e.target.value));

    const handleSortChange = (e) => {
        setSortOrder(e.target.value); 
    };

    const nivoColors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3'];

    const getNivoColor = (sum) => {
        if (sum < 10000) {
            return nivoColors[0]; // Light Green
        } else if (sum >= 30000 && sum < 40000) {
            return nivoColors[1]; // Orange
        } else if (sum >= 50000 && sum < 80000) {
            return nivoColors[2]; // Light Blue
        } else {
            return nivoColors[3]; // Pink
        }
    };

    const handleBarClick = (bar) => {
        const clickedIp = bar.indexValue;
       
        setSelectedBar(apiData[clickedIp]); 
        onBarClick(apiData[clickedIp], clickedIp); 
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
                <div style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif', justifyContent: "center", alignItems: "center", display: 'flex', }}>
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
          <div style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' ,justifyContent:"center",alignItems:"center",display: 'flex', top: 0,
            left: 0,
            width: '100%',
            height: '100%',}}>
            Sorry..! Data is not avilable at the moment..!
           
        </div>
        )
        
  
    };

    return (
        <>
        <Header title="Client with more than 1000 queries in last 24 hours" />
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px' }}>
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
                    style={{ marginRight: '20px' }}
                />
                {/* Sort Dropdown */}
                <FormControl variant="outlined" style={{ minWidth: 150, marginLeft: '20px' }}>
                    <InputLabel>Sort Order</InputLabel>
                    <Select
                        value={sortOrder}
                        onChange={handleSortChange}
                        label="Sort Order"
                    >
                        <MenuItem value="ascending"
                         sx={{
                           
                           
                            padding: '10px 20px', 
                            fontSize: '16px', 
                            borderRadius: '4px', 
                          }}
                        >Ascending</MenuItem>

                        <MenuItem value="descending"
                         sx={{
                           
                           
                            padding: '10px 20px', 
                            fontSize: '16px', 
                            borderRadius: '4px', 
                          }}>
                            Descending</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <ResponsiveBar
                data={filteredData}
                theme={{
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
                margin={{ top: 50, right: 40, bottom: 100, left: 120 }}
                padding={0.3}
                layout="horizontal"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ data }) => getNivoColor(data.sum)}
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
                    legend: 'Total Queries',
                    legendPosition: 'middle',
                    legendOffset: 70,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 2,
                    tickRotation: 0,
                    legend: 'IP Address',
                    legendPosition: 'middle',
                    legendOffset: -100,
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
                barAriaLabel={e => e.id + ": " + e.formattedValue + " for IP: " + e.indexValue}
            />
        </>
    );
}

export default HoriBarChart;
