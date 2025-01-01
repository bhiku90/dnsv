// src/DomainData.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DomainData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://typo.coednssecurity.in:5001/clientipnxdomain", {
          date: new Date().toISOString() // replace cl with actual date
        });
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Domain Data</h1>
      <ul>
        {Object.entries(data).map(([domain, info]) => (
          <li key={domain}>
            <strong>{domain}</strong>
            <ul>
              {Object.entries(info).map(([ip, record]) => (
                <li key={ip}>
                  IP: {ip} - Type: {Object.keys(record)[0]} - Count: {record[Object.keys(record)[0]]}
                </li>
              ))}
              <li>Domain Count: {info.domaincount}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainData;
