
import { tokens } from "../theme";
import axios from "axios";

export const fetchApiData = async () => {
  try {
    const response = await axios.get("https://typo.coednssecurity.in:5001/last24hours");
   
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
//fetchApiData()



export const fetchApiData7daysDga = async () => {
  try {
    console.log("data is working fine")
    const response = await axios.get("https://typo.coednssecurity.in:5001/7daysdga");
    console.table("7daysdga :-",response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};




export const fetchApiDataDgaDomain = async (clickedDate) => {
  console.log("Clicked date:", clickedDate);
  try {
    const response = await axios.post("https://typo.coednssecurity.in:5001/dgadomain",{
      date: clickedDate,
    });
    console.log("Barmdddata :-",response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const fetchApiDataDgaClientIp = async (clickedDate) => {
  console.log("Clicked date:", clickedDate);
  try {
    const response = await axios.post("https://typo.coednssecurity.in:5001/dgaclientip",{
      date: clickedDate,
    });
    console.log("Clientmdddata :-",response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};




export const fetchApiData7daysMdd = async () => {
  try {
    const response = await axios.get("https://typo.coednssecurity.in:5001/7daysmdd");
    console.table("7daysmdddata :-",response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
//fetchApiData7daysMdd();


export const fetchApiDataMddDomain = async (clickedDate) => {
  console.log("Clicked date:", clickedDate);
  try {
    const response = await axios.post("https://typo.coednssecurity.in:5001/mdddomain",{
      date: clickedDate,
    });
    console.log("Barmdddata :-",response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
//fetchApiDataMddDomain();
export const fetchApiDataMddClientIp = async (clickedDate) => {
  console.log("Clicked date:", clickedDate);
  try {
    const response = await axios.post("https://typo.coednssecurity.in:5001/mddclientip",{
      date: clickedDate,
    });
    console.log("Clientmdddata :-",response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};























export const fetchApiData7daysnxDomain = async () => {
  try {
    const response = await axios.get("https://typo.coednssecurity.in:5001/7daysnxdomain");
    console.table("nxdomain data :-",response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};


export const fetchApiDataDynamics = async () => {
  try {
    console.log("data is working fine")
    const response = await axios.get("https://typo.coednssecurity.in:5001/dynamicstats");
    console.table("7daysdga :-",response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};



//fetchapidatanxdomain
// const cl="2024-10-20" 
// export const fetchApiDataClientIpnxDomain = async () => {
//   try {
//     const response = await axios.post("https://typo.coednssecurity.in:5001/clientipnxdomain",{
//       date:cl,
//     });
//     console.table("nxx client Ip data :-",response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data", error);
//     throw error;
//   }
// };
//fetchApiDataClientIpnxDomain();
//fetchapidatanxdomain


// export const fetchApiDataClientIpnxDomain= async (clickedDate,page, itemsPerPage) => {
//   const cl = clickedDate;
//   try {
//       const response = await axios.post('https://typo.coednssecurity.in:5001/clientipnxdomain', {
//           date: cl,
//           page: page,
//           itemsPerPage: itemsPerPage,
//       });

//       const domainData = response.data.data;
//       const totalEntries = Object.keys(domainData).length;

//       const paginatedData = Object.entries(domainData).slice((page - 1) * itemsPerPage, page * itemsPerPage);
//       const formattedData = [];

//       paginatedData.forEach(([domain, info]) => {
//           const records = Object.entries(info).filter(([ip]) => ip !== "domaincount");
//           const uniqueTypes = new Set();

//           records.forEach(([ip, record]) => {
//               Object.keys(record).forEach(type => uniqueTypes.add(type));
//           });

//           const colspanCount = uniqueTypes.size;

//           records.forEach(([ip, record]) => {
//               Object.entries(record).forEach(([type, count]) => {
//                   formattedData.push({
//                       id: `${domain}-${ip}`,
//                       domain,
//                       type,
//                       count,
//                       colspan: colspanCount
//                   });
//               });
//           });
//       });

//       return { formattedData, totalPages: Math.ceil(totalEntries / itemsPerPage) };
//   } catch (error) {
//       console.error('Error fetching data:', error);
//       throw error; // rethrow the error for handling in DomainTable
//   }
// };

const fetchApiDataClientIpnxDomain = async (clickedDate,page,itemsPerPage) => {
  const cl=clickedDate;
  try {
    const response = await axios.post('https://typo.coednssecurity.in:5001/clientipnxdomain', {
      date: cl, 
      page,
      itemsPerPage,
    });
    
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export { fetchApiDataClientIpnxDomain};

// export const fetchApiDataRecently5days = async (page, pageSize) => {
//   //console.log("Clicked date:", clickedDate);
//   try {
//     const response = await axios.post("https://typo.coednssecurity.in:5001/clientipnxdomain",{date:"2024-12-16"});
    
//     console.log("Full response data:", response.data);

//     // Convert nested objects to an array of entries for easier pagination
//     const dataArray = Object.entries(response.data.data).map(([domain, details]) => ({
//       domain,
//       details,
//     }));

//     // Pagination logic
//     const totalPages = Math.ceil(dataArray.length / pageSize);
//     const start = (page - 1) * pageSize;
//     const pageData = dataArray.slice(start, start + pageSize);

//     //console.log(`Page ${page} data:`, pageData);
//     return {
//       data: pageData,
//       totalPages,
//       currentPage: page,
//     };
//   } catch (error) {
//     console.error("Error fetching data", error);
//     throw error;
//   }
// };

// fetchApiDataRecently5days(51,50);










export const mockDataTeam = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "admin",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "user",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "admin",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "user",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    access: "manager",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    access: "user",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    access: "user",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
];

export const mockDataContacts = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address: "0912 Won Street, Alabama, SY 10001",
    city: "New York",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    zipCode: "13151",
    registrarId: 123512,
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    zipCode: "87281",
    registrarId: 4132513,
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    zipCode: "15551",
    registrarId: 123512,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    zipCode: "14215",
    registrarId: 123512,
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    zipCode: "51523",
    registrarId: 123512,
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 512315,
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    zipCode: "111234",
    registrarId: 928397,
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "(222)444-5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 533215,
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "(444)555-6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    zipCode: "1234",
    registrarId: 92197,
  },
];

export const mockDataInvoices = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    cost: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    cost: "1.24",
    phone: "(421)314-2288",
    date: "06/15/2021",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    cost: "11.24",
    phone: "(422)982-6739",
    date: "05/02/2022",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    cost: "80.55",
    phone: "(921)425-6742",
    date: "03/21/2022",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    cost: "1.24",
    phone: "(421)445-1189",
    date: "01/12/2021",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    cost: "63.12",
    phone: "(232)545-6483",
    date: "11/02/2022",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    cost: "52.42",
    phone: "(543)124-0123",
    date: "02/11/2022",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    cost: "21.24",
    phone: "(222)444-5555",
    date: "05/02/2021",
  },
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "goodmanave",
    date: "2022-11-05",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "stevebower",
    date: "2022-11-02",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const mockBarData = [
  {
        "2024-09-06": 0,
        "2024-09-07": 42,
        "2024-09-08": 64,
        "2024-09-09": 54,
        "2024-09-10": 106,
        "2024-09-11": 112,
        "2024-09-12": 0
}
];

export const mockHorBarData = [
  {
        "103.149.196.80": {
            "2024-09-08 15": 3263,
            "2024-09-08 16": 3549,
            "2024-09-08 17": 2682,
            "2024-09-08 18": 2770,
            "2024-09-08 19": 3347,
            "2024-09-08 20": 3259,
            "2024-09-08 21": 4883,
            "2024-09-08 22": 3104,
            "2024-09-08 23": 4270,
            "2024-09-09 00": 3289,
            "2024-09-09 01": 1501,
            "2024-09-09 02": 933,
            "2024-09-09 03": 659,
            "2024-09-09 04": 681,
            "2024-09-09 05": 678,
            "2024-09-09 06": 878,
            "2024-09-09 07": 1087,
            "2024-09-09 08": 903,
            "2024-09-09 09": 3011,
            "2024-09-09 10": 8120,
            "2024-09-09 11": 7449,
            "2024-09-09 12": 7293,
            "2024-09-09 13": 7228,
            "2024-09-09 14": 5214
        },
        "103.149.196.81": {
            "2024-09-08 15": 2342,
            "2024-09-08 16": 2187,
            "2024-09-08 17": 3003,
            "2024-09-08 18": 1236,
            "2024-09-08 19": 1170,
            "2024-09-08 20": 3850,
            "2024-09-08 21": 2923,
            "2024-09-08 22": 3070,
            "2024-09-08 23": 4289,
            "2024-09-09 00": 2837,
            "2024-09-09 01": 1557,
            "2024-09-09 02": 762,
            "2024-09-09 03": 423,
            "2024-09-09 04": 421,
            "2024-09-09 05": 288,
            "2024-09-09 06": 473,
            "2024-09-09 07": 829,
            "2024-09-09 08": 755,
            "2024-09-09 09": 736,
            "2024-09-09 10": 192,
            "2024-09-09 11": 143,
            "2024-09-09 12": 72,
            "2024-09-09 13": 289,
            "2024-09-09 14": 496
        },
        "103.149.196.82": {
            "2024-09-08 15": 841,
            "2024-09-08 16": 2478,
            "2024-09-08 17": 1819,
            "2024-09-08 18": 1650,
            "2024-09-08 19": 2426,
            "2024-09-08 20": 1963,
            "2024-09-08 21": 3276,
            "2024-09-08 22": 4001,
            "2024-09-08 23": 3870,
            "2024-09-09 00": 2182,
            "2024-09-09 01": 1510,
            "2024-09-09 02": 403,
            "2024-09-09 03": 585,
            "2024-09-09 04": 488,
            "2024-09-09 05": 1208,
            "2024-09-09 06": 529,
            "2024-09-09 07": 754,
            "2024-09-09 08": 789,
            "2024-09-09 09": 485,
            "2024-09-09 10": 1547,
            "2024-09-09 11": 2068,
            "2024-09-09 12": 641,
            "2024-09-09 13": 347,
            "2024-09-09 14": 598
        },
        "103.149.196.83": {
            "2024-09-08 15": 4225,
            "2024-09-08 16": 4508,
            "2024-09-08 17": 4251,
            "2024-09-08 18": 3150,
            "2024-09-08 19": 5954,
            "2024-09-08 20": 7797,
            "2024-09-08 21": 7403,
            "2024-09-08 22": 13021,
            "2024-09-08 23": 7500,
            "2024-09-09 00": 5871,
            "2024-09-09 01": 2417,
            "2024-09-09 02": 1510,
            "2024-09-09 03": 1174,
            "2024-09-09 04": 1033,
            "2024-09-09 05": 1038,
            "2024-09-09 06": 1164,
            "2024-09-09 07": 1657,
            "2024-09-09 08": 1005,
            "2024-09-09 09": 184,
            "2024-09-09 10": 121,
            "2024-09-09 11": 57,
            "2024-09-09 12": 699,
            "2024-09-09 13": 455,
            "2024-09-09 14": 219
        },
        "103.149.196.84": {
            "2024-09-08 15": 1316,
            "2024-09-08 16": 1136,
            "2024-09-08 17": 1290,
            "2024-09-08 18": 988,
            "2024-09-08 19": 1246,
            "2024-09-08 20": 1598,
            "2024-09-08 21": 3332,
            "2024-09-08 22": 2549,
            "2024-09-08 23": 4252,
            "2024-09-09 00": 3414,
            "2024-09-09 01": 1268,
            "2024-09-09 02": 621,
            "2024-09-09 03": 250,
            "2024-09-09 04": 213,
            "2024-09-09 05": 260,
            "2024-09-09 06": 455,
            "2024-09-09 07": 961,
            "2024-09-09 08": 720,
            "2024-09-09 09": 425,
            "2024-09-09 10": 542,
            "2024-09-09 11": 621,
            "2024-09-09 12": 926,
            "2024-09-09 13": 529,
            "2024-09-09 14": 566
        },
        "103.149.196.85": {
            "2024-09-08 15": 4597,
            "2024-09-08 16": 4152,
            "2024-09-08 17": 2845,
            "2024-09-08 18": 3309,
            "2024-09-08 19": 2691,
            "2024-09-08 20": 6573,
            "2024-09-08 21": 8060,
            "2024-09-08 22": 7526,
            "2024-09-08 23": 8932,
            "2024-09-09 00": 4985,
            "2024-09-09 01": 2332,
            "2024-09-09 02": 1001,
            "2024-09-09 03": 814,
            "2024-09-09 04": 760,
            "2024-09-09 05": 765,
            "2024-09-09 06": 1173,
            "2024-09-09 07": 1487,
            "2024-09-09 08": 1150,
            "2024-09-09 09": 561,
            "2024-09-09 10": 239,
            "2024-09-09 11": 438,
            "2024-09-09 12": 839,
            "2024-09-09 13": 498,
            "2024-09-09 14": 551
        },
        "103.149.196.86": {
            "2024-09-08 15": 2074,
            "2024-09-08 16": 1334,
            "2024-09-08 17": 1216,
            "2024-09-08 18": 1519,
            "2024-09-08 19": 2604,
            "2024-09-08 20": 2796,
            "2024-09-08 21": 3305,
            "2024-09-08 22": 3060,
            "2024-09-08 23": 3232,
            "2024-09-09 00": 2832,
            "2024-09-09 01": 911,
            "2024-09-09 02": 393,
            "2024-09-09 03": 447,
            "2024-09-09 04": 162,
            "2024-09-09 05": 167,
            "2024-09-09 06": 255,
            "2024-09-09 07": 451,
            "2024-09-09 08": 972,
            "2024-09-09 09": 1170,
            "2024-09-09 10": 1227,
            "2024-09-09 11": 631,
            "2024-09-09 12": 1057,
            "2024-09-09 13": 2565,
            "2024-09-09 14": 2361
        },
  }
  
]

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockTreeData =
  {
  "name": "nivo",
  "color": "hsl(4, 70%, 50%)",
  "children": [
    {
      "name": "viz",
      "color": "hsl(13, 70%, 50%)",
      "children": [
        {
          "name": "stack",
          "color": "hsl(173, 70%, 50%)",
          "children": [
            {
              "name": "cchart",
              "color": "hsl(252, 70%, 50%)",
              "loc": 154205
            },
            {
              "name": "xAxis",
              "color": "hsl(167, 70%, 50%)",
              "loc": 78021
            },
            {
              "name": "yAxis",
              "color": "hsl(118, 70%, 50%)",
              "loc": 172896
            },
            {
              "name": "layers",
              "color": "hsl(52, 70%, 50%)",
              "loc": 31986
            }
          ]
        },
        {
          "name": "ppie",
          "color": "hsl(306, 70%, 50%)",
          "children": [
            {
              "name": "chart",
              "color": "hsl(201, 70%, 50%)",
              "children": [
                {
                  "name": "pie",
                  "color": "hsl(30, 70%, 50%)",
                  "children": [
                    {
                      "name": "outline",
                      "color": "hsl(132, 70%, 50%)",
                      "loc": 85099
                    },
                    {
                      "name": "slices",
                      "color": "hsl(86, 70%, 50%)",
                      "loc": 41906
                    },
                    {
                      "name": "bbox",
                      "color": "hsl(324, 70%, 50%)",
                      "loc": 83560
                    }
                  ]
                },
                {
                  "name": "donut",
                  "color": "hsl(54, 70%, 50%)",
                  "loc": 162485
                },
                {
                  "name": "gauge",
                  "color": "hsl(280, 70%, 50%)",
                  "loc": 142717
                }
              ]
            },
            {
              "name": "legends",
              "color": "hsl(263, 70%, 50%)",
              "loc": 135468
            }
          ]
        }
      ]
    },
    {
      "name": "colors",
      "color": "hsl(322, 70%, 50%)",
      "children": [
        {
          "name": "rgb",
          "color": "hsl(17, 70%, 50%)",
          "loc": 132589
        },
        {
          "name": "hsl",
          "color": "hsl(151, 70%, 50%)",
          "loc": 142326
        }
      ]
    },
    {
      "name": "utils",
      "color": "hsl(9, 70%, 50%)",
      "children": [
        {
          "name": "randomize",
          "color": "hsl(9, 70%, 50%)",
          "loc": 82372
        },
        {
          "name": "resetClock",
          "color": "hsl(296, 70%, 50%)",
          "loc": 194028
        },
        {
          "name": "noop",
          "color": "hsl(330, 70%, 50%)",
          "loc": 26442
        },
        {
          "name": "tick",
          "color": "hsl(151, 70%, 50%)",
          "loc": 35525
        },
        {
          "name": "forceGC",
          "color": "hsl(329, 70%, 50%)",
          "loc": 152661
        },
        {
          "name": "stackTrace",
          "color": "hsl(57, 70%, 50%)",
          "loc": 26868
        },
        {
          "name": "dbg",
          "color": "hsl(184, 70%, 50%)",
          "loc": 170265
        }
      ]
    },
    {
      "name": "generators",
      "color": "hsl(127, 70%, 50%)",
      "children": [
        {
          "name": "address",
          "color": "hsl(280, 70%, 50%)",
          "loc": 2973
        },
        {
          "name": "city",
          "color": "hsl(333, 70%, 50%)",
          "loc": 61362
        },
        {
          "name": "animal",
          "color": "hsl(355, 70%, 50%)",
          "loc": 166180
        },
        {
          "name": "movie",
          "color": "hsl(155, 70%, 50%)",
          "loc": 90247
        },
        {
          "name": "user",
          "color": "hsl(273, 70%, 50%)",
          "loc": 160757
        }
      ]
    },
    {
      "name": "set",
      "color": "hsl(257, 70%, 50%)",
      "children": [
        {
          "name": "clone",
          "color": "hsl(228, 70%, 50%)",
          "loc": 91223
        },
        {
          "name": "intersect",
          "color": "hsl(59, 70%, 50%)",
          "loc": 162926
        },
        {
          "name": "merge",
          "color": "hsl(108, 70%, 50%)",
          "loc": 89862
        },
        {
          "name": "reverse",
          "color": "hsl(69, 70%, 50%)",
          "loc": 109337
        },
        {
          "name": "toArray",
          "color": "hsl(340, 70%, 50%)",
          "loc": 181553
        },
        {
          "name": "toObject",
          "color": "hsl(273, 70%, 50%)",
          "loc": 70473
        },
        {
          "name": "fromCSV",
          "color": "hsl(311, 70%, 50%)",
          "loc": 95307
        },
        {
          "name": "slice",
          "color": "hsl(147, 70%, 50%)",
          "loc": 116112
        },
        {
          "name": "append",
          "color": "hsl(97, 70%, 50%)",
          "loc": 186707
        },
        {
          "name": "prepend",
          "color": "hsl(78, 70%, 50%)",
          "loc": 169462
        },
        {
          "name": "shuffle",
          "color": "hsl(356, 70%, 50%)",
          "loc": 22791
        },
        {
          "name": "pick",
          "color": "hsl(177, 70%, 50%)",
          "loc": 5953
        },
        {
          "name": "plouc",
          "color": "hsl(71, 70%, 50%)",
          "loc": 128965
        }
      ]
    },
    {
      "name": "text",
      "color": "hsl(287, 70%, 50%)",
      "children": [
        {
          "name": "trim",
          "color": "hsl(149, 70%, 50%)",
          "loc": 40395
        },
        {
          "name": "slugify",
          "color": "hsl(117, 70%, 50%)",
          "loc": 179361
        },
        {
          "name": "snakeCase",
          "color": "hsl(101, 70%, 50%)",
          "loc": 70267
        },
        {
          "name": "camelCase",
          "color": "hsl(274, 70%, 50%)",
          "loc": 136862
        },
        {
          "name": "repeat",
          "color": "hsl(47, 70%, 50%)",
          "loc": 125877
        },
        {
          "name": "padLeft",
          "color": "hsl(175, 70%, 50%)",
          "loc": 114812
        },
        {
          "name": "padRight",
          "color": "hsl(355, 70%, 50%)",
          "loc": 155758
        },
        {
          "name": "sanitize",
          "color": "hsl(163, 70%, 50%)",
          "loc": 72941
        },
        {
          "name": "ploucify",
          "color": "hsl(196, 70%, 50%)",
          "loc": 41758
        }
      ]
    },
    {
      "name": "misc",
      "color": "hsl(49, 70%, 50%)",
      "children": [
        {
          "name": "greetings",
          "color": "hsl(44, 70%, 50%)",
          "children": [
            {
              "name": "hey",
              "color": "hsl(113, 70%, 50%)",
              "loc": 8521
            },
            {
              "name": "HOWDY",
              "color": "hsl(358, 70%, 50%)",
              "loc": 57194
            },
            {
              "name": "aloha",
              "color": "hsl(189, 70%, 50%)",
              "loc": 70355
            },
            {
              "name": "AHOY",
              "color": "hsl(107, 70%, 50%)",
              "loc": 112634
            }
          ]
        },
        {
          "name": "other",
          "color": "hsl(209, 70%, 50%)",
          "loc": 49745
        },
        {
          "name": "path",
          "color": "hsl(341, 70%, 50%)",
          "children": [
            {
              "name": "pathA",
              "color": "hsl(79, 70%, 50%)",
              "loc": 77019
            },
            {
              "name": "pathB",
              "color": "hsl(25, 70%, 50%)",
              "children": [
                {
                  "name": "pathB1",
                  "color": "hsl(300, 70%, 50%)",
                  "loc": 199862
                },
                {
                  "name": "pathB2",
                  "color": "hsl(231, 70%, 50%)",
                  "loc": 161214
                },
                {
                  "name": "pathB3",
                  "color": "hsl(121, 70%, 50%)",
                  "loc": 93838
                },
                {
                  "name": "pathB4",
                  "color": "hsl(261, 70%, 50%)",
                  "loc": 191475
                }
              ]
            },
            {
              "name": "pathC",
              "color": "hsl(13, 70%, 50%)",
              "children": [
                {
                  "name": "pathC1",
                  "color": "hsl(211, 70%, 50%)",
                  "loc": 133777
                },
                {
                  "name": "pathC2",
                  "color": "hsl(180, 70%, 50%)",
                  "loc": 82322
                },
                {
                  "name": "pathC3",
                  "color": "hsl(242, 70%, 50%)",
                  "loc": 90891
                },
                {
                  "name": "pathC4",
                  "color": "hsl(137, 70%, 50%)",
                  "loc": 71233
                },
                {
                  "name": "pathC5",
                  "color": "hsl(326, 70%, 50%)",
                  "loc": 94484
                },
                {
                  "name": "pathC6",
                  "color": "hsl(243, 70%, 50%)",
                  "loc": 36284
                },
                {
                  "name": "pathC7",
                  "color": "hsl(306, 70%, 50%)",
                  "loc": 172751
                },
                {
                  "name": "pathC8",
                  "color": "hsl(88, 70%, 50%)",
                  "loc": 107876
                },
                {
                  "name": "pathC9",
                  "color": "hsl(253, 70%, 50%)",
                  "loc": 150629
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}


export const mockLineData = [
  {
    "2024-09-08 15": 3263,
    "2024-09-08 16": 3549,
    "2024-09-08 17": 2682,
    "2024-09-08 18": 2770,
    "2024-09-08 19": 3347,
    "2024-09-08 20": 3259,
    "2024-09-08 21": 4883,
    "2024-09-08 22": 3104,
    "2024-09-08 23": 4270,
    "2024-09-09 00": 3289,
    "2024-09-09 01": 1501,
    "2024-09-09 02": 933,
    "2024-09-09 03": 659,
    "2024-09-09 04": 681,
    "2024-09-09 05": 678,
    "2024-09-09 06": 878,
    "2024-09-09 07": 1087,
    "2024-09-09 08": 903,
    "2024-09-09 09": 3011,
}
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];

