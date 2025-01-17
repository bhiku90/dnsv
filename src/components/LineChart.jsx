import { ResponsiveLine } from '@nivo/line';
//import { mockLineData as data } from '../data/mockData';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { Box } from 'devextreme-react';
import Header from './Header';


const LineChart = ({ isDashboard = false, data, onBack,clickedIp }) => {
  console.log("last dat",data)

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const extractedData = data;

  const transformData = (extractedData) => {
    //console.log('rawdata~~~~',extractedData);
    return [
      {
        id: 'count', // Assigning a generic ID for the series
        data: Object.entries(extractedData).map(([key, value]) => ({
          x: key, // date/time as x-axis value
          y: value // count as y-axis value
        }))
      }
    ];
  };
  const nivoFormattedData = transformData(extractedData);
  //console.log("nivoFormattedData------:",nivoFormattedData);

  return (






    <>

     
      <Header title={`Number of requests in last 24 hours by IP ${clickedIp}`} />
      <Button
        onClick={onBack}
        variant="outlined"
        sx={{marginLeft:"20px"}}
        color="info"
        startIcon={<ArrowBackIcon />}

      >
        Back
      </Button>

      <ResponsiveLine
        data={nivoFormattedData}
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
        colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }}

        margin={{ top: 50, right: 110, bottom: 90, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 30,
          legend: isDashboard ? undefined : 'Time',
          legendOffset: 70,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : 'count',
          legendOffset: -50,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </>
  );
}

export default LineChart;