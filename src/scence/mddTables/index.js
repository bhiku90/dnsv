import React from 'react';
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { fetchApiDataMddClientIp } from "../../data/mockData";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import dayjs from "dayjs";
import { CircularProgress, Typography } from "@mui/material";
import { Width } from 'devextreme-react/cjs/chart';

function MddTable1({ data, clickedDate, onDomainClick, onBack }) {
    const theme = useTheme();
    const [selectedDomainData, setSelectedDomainData] = useState(null);
    const [loading, setLoading] = useState(false);


    //console.log("MdddData:=======",data);
    // const rows = [];
    // Object.entries(data).forEach(([domainIndex, domainDataArray]) => {
    //     domainDataArray.forEach((item, ipIndex) => {
    //         rows.push({
    //             id: `${domainIndex}-${ipIndex}`, // Unique ID for each row
    //             fqdn: item.fqdn || 'N/A', //Only display fqdn for the first IP of the group
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
    //     domainDataArray.forEach((item, itemIndex) => {
    //         const fqdn = item.fqdn || 'NA'; 
    //         const registrar = getFirstNonNullValue(item.registrar); 
    //         const registrant = getFirstNonNullValue(item.registrant); 
    //         //const domainRows = [];

    //         rows.push({
    //             id: `${domainIndex}-${itemIndex}-domain`, 
    //             fqdn, 
    //             ip: '', 
    //             status: '', 
    //             location: '', 
    //             activedate: '', 
    //             inactivedate: '', 
    //             registrar: registrar || 'N/A',
    //             registrant: registrant || 'N/A', 
    //             rawData: item, 
    //         });


    //         item.data.forEach((d, dataIndex) => {
    //             rows.push({
    //                 id: `${domainIndex}-${itemIndex}-${dataIndex}`,
    //                 fqdn: '',
    //                 ip: d.ip || 'N/A', 
    //                 status: d.status || 'N/A', 
    //                 location: d.location == 'not there' ? 'N/A' : d.location || 'N/A',
    //                 activedate: d.activedate[0] || 'N/A', 
    //                 inactivedate: d.inactivedate?.[0] || 'N/A', 
    //                 registrar: '',
    //                 registrant: '', 
    //                 rawData: item, 
    //             });
    //         });







    //     });
    // });
    // function getFirstNonNullValue(array) {
    //     if (!Array.isArray(array)) return array; 
    //     return array.find((val) => val !== null) || 'N/A'; 
    // }


    const rows = [];
    let serialNumber = 1;

    Object.entries(data).forEach(([domainIndex, domainDataArray]) => {
        domainDataArray.forEach((item, itemIndex) => {
            const fqdn = item.fqdn || 'NA';
            const registrar = getFirstNonNullValue(item.registrar);
            const registrant = getFirstNonNullValue(item.registrant);


            const ipData = item.data.map((d) => ({

                ip: d.ip || 'N/A',
                status: d.status || 'N/A',
                location: d.location == 'not there' ? 'N/A' : d.location || 'N/A',
                activedate: d.activedate[0] || 'N/A',
                inactivedate: d.inactivedate?.[0] || 'N/A',
            }));


            rows.push({
                id: `${domainIndex}-${itemIndex}-domain`,
                SrNo: serialNumber++,
                fqdn,
                ip: ipData[0]?.ip || 'N/A',
                status: ipData[0]?.status || 'N/A',
                location: ipData[0]?.location || 'N/A',
                activedate: ipData[0]?.activedate || 'N/A',
                inactivedate: ipData[0]?.inactivedate || 'N/A',
                registrar: registrar || 'N/A',
                registrant: registrant || 'N/A',
                rawData: item,
            });

            ipData.slice(1).forEach((d, dataIndex) => {
                rows.push({
                    id: `${domainIndex}-${itemIndex}-${dataIndex}`,
                    fqdn: '',
                    ip: d.ip,
                    status: d.status,
                    location: d.location,
                    activedate: d.activedate,
                    inactivedate: d.inactivedate,
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
            field: "SrNo",
            headerName: "Sr-No",
            width: 50,
            flex: 1,


        },
        {
            field: "fqdn",
            headerName: "Domain Name",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params) => (
                <div
                    style={{
                        whiteSpace: 'normal',
                        lineHeight: 'normal',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        textAlign: 'center',
                        cursor: "pointer"
                    }}
                    onClick={() => handleDomainCellClick(params.value)}>{params.value}</div>
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
            setLoading(true)

            const last7Days = Array.from({ length: 7 }, (_, i) =>
                dayjs().subtract(i + 1, 'day').format('YYYY-MM-DD')
            );
            console.log('Last 7 days are@@@@@@@:', last7Days);

            const aggregatedData = {};

            for (const date of last7Days) {
                try {
                    const response = await fetchApiDataMddClientIp(date);
                    console.log(`Data for ${date}:`, response.data);

                    if (!response || !response.data) continue;

                    Object.entries(response.data).forEach(([fqdn, domainData]) => {
                        console.log("fqdn----------", fqdn);
                        const fqdnSuffix = fqdn.split('.').slice(-2).join('.');  //prod-blue.razorpay.com     0-0-003orange-001enschede.prod-blue.razorpay.com
                        const fqdnSuffix1 = fqdn.includes   (inputDomain);
                        console.log("fqdnSuffix1=======", fqdnSuffix1);
                        if (fqdnSuffix1) {
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


            console.log("merged data is", aggregatedData);
        } catch (error) {
            console.error('Error fetching data for the last 7 days:', error);
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
                <div style={{
                    fontSize: '20px', fontFamily: 'Arial, sans-serif', justifyContent: "center", alignItems: "center", display: 'flex', 
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}>
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
        <Box m="20px">
            {/* <Header subtitle={`Data For IP: ${''}`}/> */}

            <Button
                onClick={onBack}
                variant="outlined"
                color="info"
                startIcon={<ArrowBackIcon />}

            >
                Back
            </Button>
            <Box m="40px 0 0 0" height="75vh">

                <DataGrid rows={rows} columns={columns} />

            </Box>
        </Box>
    )
}

export default MddTable1;