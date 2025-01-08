import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { fetchApiData7daysMdd, fetchApiDataMddDomain ,fetchApiData7daysnxDomain,fetchApiDataClientIpnxDomain} from "../data/mockData";
import { useState, useEffect } from "react";
import Header from "./Header";



const NxBarChartMal = ({isDashboard = false,onBarClick}) =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [nxapidata, setnxapiData] = useState([]);
    const [clickedDateData, setClickedDateData] = useState(null);
    const [loading,setLoading] = useState(true);
    


    useEffect(() =>{
      setLoading(true);
      const getNxData = async () =>{
        try {
        const nxData = await fetchApiData7daysnxDomain();
        setnxapiData(nxData.data);
        console.log("nxdomain data in nxbar : -" , nxData.data);
        setLoading(false);
        }catch (error){
          console.log("Error feching data for the NX domain Bar chart :",error.message);
          setLoading(true);   
        }
      }
      getNxData();
    },[])

    //console.log("data=",data);
    const modifiedData = Object.entries(nxapidata).map(([key, value]) => {
        return { key,value };
    });
   

    const nivoColors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3'];

    const getNivoColor = (val) => {
        //console.log(val)
        if (val >= 10 && val <=49) {
          return nivoColors[0]; // Light Green
        } else if (val >= 50 && val <=100) {
          return nivoColors[1]; // Orange
        } else if (val >= 100 && val<=150) {
          return nivoColors[2]; // Light Blue
        } else {
          return nivoColors[3]; // Pink
        }
      };

    const handleBarClick = (bar) => {
      onBarClick(bar.indexValue); 
      // Pass the clicked date
    
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
        <Header title="NX Domains in Last 7 days" />
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

export default NxBarChartMal;