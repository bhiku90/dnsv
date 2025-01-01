import { ResponsiveTreeMap } from '@nivo/treemap';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { mockTreeData as data } from '../data/mockData';


const TreeChart = ({ isDashboard = false }) =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
//console.log(data);
return (
    <ResponsiveTreeMap
        data={data}
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
        
        identity="name"
        value="loc"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={10}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    3.2
                ]
            ]
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    4
                ]
            ]
        }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.1
                ]
            ]
        }}
    />
    );
}

export default TreeChart;

