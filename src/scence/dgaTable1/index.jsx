import React from 'react';
import { Box,useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { fetchApiDataDgaClientIp } from "../../data/mockData";
import dayjs from "dayjs";

function DgaTable1({data, clickedDate, onDomainClick, onBack}) {
    const theme = useTheme();
    const [selectedDomainData, setSelectedDomainData] = useState(null);

    //console.log("MdddData:=======",data);
    // const rows = [];
    // Object.entries(data).forEach(([domainIndex, domainDataArray]) => {
    //     domainDataArray.forEach((item, ipIndex) => {
    //         rows.push({
    //             id: `${domainIndex}-${ipIndex}`, // Unique ID for each row
    //             fqdn: item.fqdn || 'NA', //Only display fqdn for the first IP of the group
    //             ip: item.data.map((d) => d.ip || 'N/A').join(", "),
    //             status: item.data.map((d) => d.status).join(", "),
    //             location: item.data.map((d) => d    .location).join(", "),
    //             activedate: item.data.map((d) => d.activedate[0]).join(", "),
    //             inactivedate: item.data.map((d) => d.inactivedate?.[0] || 'N/A').join(", "),
    //             registrar: Array.isArray(item.registrar) ? item.registrar.join(", ") : item.registrar,
    //             registrant: Array.isArray(item.registrant) ? item.registrant.join(",") : item.registrant,
    //             rawData: item,
    //         });
    //     });
    // });


//     const rows = [];
// Object.entries(data).forEach(([domainIndex, domainDataArray]) => {
//     domainDataArray.forEach((item, ipIndex) => {
//         item.data.forEach((d, dataIndex) => {
//             rows.push({
//                 id: `${domainIndex}-${ipIndex}-${dataIndex}`, // Unique ID for each row
//                 fqdn: ipIndex === 0 && dataIndex === 0 ? item.fqdn || 'NA' : '', // Only display FQDN for the first IP of the group
//                 ip: d.ip || 'N/A',
//                 status: d.status || 'N/A',
//                 location: d.location || 'N/A',
//                 activedate: d.activedate[0] || 'N/A',
//                 inactivedate: d.inactivedate?.[0] || 'N/A',
//                 registrar: getFirstNonNullValue(item.registrar) || 'N/A',
//                 registrant: getFirstNonNullValue(item.registrant) || 'N/A',
//                 rawData: item,
//             });
//         });
//     });
// });

//     function getFirstNonNullValue(array) {
//         if (!Array.isArray(array)) return array; // Handle non-array cases
//         return array.find((val) => val !== null) || 'N/A'; // Find the first non-null value
//     }


const rows = [];
Object.entries(data).forEach(([domainIndex, domainDataArray]) => {
    domainDataArray.forEach((item, itemIndex) => {
        const fqdn = item.fqdn || 'NA'; 
        const registrar = getFirstNonNullValue(item.registrar); 
        const registrant = getFirstNonNullValue(item.registrant); 
        //const domainRows = [];

        rows.push({
            id: `${domainIndex}-${itemIndex}-domain`, 
            fqdn, 
            ip: '', 
            status: '', 
            location: '', 
            activedate: '', 
            inactivedate: '', 
            registrar: registrar || 'N/A',
            registrant: registrant || 'N/A', 
            rawData: item, 
        });

      
        item.data.forEach((d, dataIndex) => {
            rows.push({
                id: `${domainIndex}-${itemIndex}-${dataIndex}`,
                fqdn: '',
                ip: d.ip || 'N/A', 
                status: d.status || 'N/A', 
                location: d.location == 'not there' ? 'N/A' : d.location || 'N/A',
                activedate: d.activedate[0] || 'N/A', 
                inactivedate: d.inactivedate?.[0] || 'N/A', 
                registrar: '',
                registrant: '', 
                rawData: item, 
            });
        });


      




    });
});


function getFirstNonNullValue(array) {
    if (!Array.isArray(array)) return array; 
    return array.find((val) => val !== null) || 'N/A'; 
}




    const columns = [
        {
            field: "fqdn",
            headerName: "Domain Name",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', lineHeight: 'normal' }} onClick={() => handleDomainCellClick(params.value)}>{params.value}</div>
            ),
        },
        {
            field: "registrar",
            headerName: "Registrar",
            flex: 1
        },
        {
            field: "registrant",
            headerName: "Registrant",
            flex: 1
        },
        {
            field: "ip",
            headerName: "IP Addresses",
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1
        },
        {
            field: "location",
            headerName: "Geo-Location",
            flex: 1
        },
       
        {
            field: "activedate",
            headerName: "Active Date",
            flex: 1
        },
        {
            field: "inactivedate",
            headerName: "Inactive Date",
            flex: 1
        }
    ];




    const handleDomainCellClick = async (inputDomain) => {
        console.log('Input domain is @@@@@@@@@@@@@@@@@@@:', inputDomain);

        try {
            const last7Days = Array.from({ length: 7 }, (_, i) =>
                dayjs().subtract(i + 1, 'day').format('YYYY-MM-DD')
            );
            console.log('Last 7 days are@@@@@@@:', last7Days);

            const aggregatedData = {};

            for (const date of last7Days) {
                try {
                    const response = await fetchApiDataDgaClientIp(date);
                    console.log(`Data for ${date}:`, response.data);

                    if (!response || !response.data) continue;

                    Object.entries(response.data).forEach(([fqdn, domainData]) => {
                        // console.log("fqdn----------",fqdn);
                        // const fqdnSuffix = fqdn.split('.').slice(-2).join('.');  //prod-blue.razorpay.com     0-0-003orange-001enschede.prod-blue.razorpay.com
                        // const fqdnSuffix1 = fqdn.includes(inputDomain);
                        // console.log("fqdnSuffix1=======",fqdnSuffix1);
                        if (fqdn == inputDomain) {
                            console.log(`Matched FQDN: ${fqdn}`, domainData);

                            Object.entries(domainData).forEach(([ip, queries]) => {
                                if (ip === 'domaincount') return;

                                if (!aggregatedData[ip]) {
                                    aggregatedData[ip] = { ipTotal: 0, dates: [], queryCounts: {} };
                                }

                                // Add the date only if it's not already present
                            if (!aggregatedData[ip].dates.includes(date)) {
                                aggregatedData[ip].dates.push(date);
                            } 

                                Object.entries(queries).forEach(([queryType, count]) => {
                                    if (!aggregatedData[ip].queryCounts[queryType]) {
                                        aggregatedData[ip].queryCounts[queryType] = 0;
                                    }

                                    aggregatedData[ip].queryCounts[queryType] += count;
                                    aggregatedData[ip].ipTotal += count;
                                });
                            });
                        }
                    });
                } catch (error) {
                    console.error(`Error fetching data for ${date}:`, error);
                }
            }

            setSelectedDomainData(aggregatedData);
            onDomainClick({ domainName: inputDomain, data: aggregatedData });
            console.log("merged data is",aggregatedData);
        } catch (error) {
            console.error('Error fetching data for the last 7 days:', error);
        }
    };

  return (
    <Box m="20px">
        {/* <Header subtitle={`Data For IP: ${''}`}/> */}
        <button onClick={onBack}>Back to Chart</button>
        <Box m="40px 0 0 0" height="75vh">
            <DataGrid rows={rows} columns={columns}/>
        </Box>
    </Box>
  )
}

export default DgaTable1;