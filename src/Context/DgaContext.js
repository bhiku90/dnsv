import React, { createContext, useState, useEffect } from 'react';
import { fetchApiData7daysDga } from '../data/mockData';


const DgaContext = createContext();

const DgaProvider = ({ children }) => {
  const [dgaSum, setDgaSum] = useState(null);
  const [dgaLoading, setDgaLoading] = useState(true);
  const[dgaData,setdgaData] = useState(null);

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

  const fetchDgaData = async () => {
    try {
     
      const dgaData = await fetchApiData7daysDga();
      console.log("DGA data:", dgaData);
      setdgaData(dgaData.data)

      const sum = Object.values(dgaData.data).reduce((acc, value) => acc + value, 0);
      console.log("Calculated sum:", sum);

      const formattedSum = formatValue(sum);
      console.log("Formatted sum:", formattedSum);

      setDgaSum(formattedSum);
      localStorage.setItem('dgaSum', JSON.stringify(formattedSum));
      localStorage.setItem('dgaFetched', 'true');

      setDgaLoading(false);
    } catch (error) {
      console.error("Error fetching DGA data:", error);
      setDgaLoading(false);
    }
  };


  useEffect(() => {
    fetchDgaData();
  }, []);

  return (
    <DgaContext.Provider value={{ dgaSum, dgaLoading, dgaData }}>
      {children}
    </DgaContext.Provider>
  );
};

export { DgaContext, DgaProvider };
