import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ data }) => {
  // Define columns for the DataGrid
  const columns = [
    { field: "domain", headerName: "Domain Name", width: 200 },
    { field: "ip", headerName: "IP Addresses", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "geolocation", headerName: "Geolocation", width: 200 },
    { field: "registrar", headerName: "Registrar", width: 200 },
    { field: "registrant", headerName: "Registrant", width: 200 },
    { field: "activedate", headerName: "Active Date", width: 150 },
    { field: "inactivedate", headerName: "Inactive Date", width: 150 },
  ];

  // Prepare rows for the DataGrid
  const rows = data.map((item, index) => ({
    id: index,
    domain: item.fqdn,
    ip: item.data[0]?.ip || "N/A",
    status: item.data[0]?.status || "N/A",
    geolocation: item.data[0]?.location.join(", ") || "N/A",
    registrar: item.registrar.join(", ") || "N/A",
    registrant: item.registrant.join(", ") || "N/A",
    activedate: item.data[0]?.activedate.join(", ") || "N/A",
    inactivedate: item.data[0]?.inactivedate?.join(", ") || "N/A",
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} pagination />
    </div>
  );
};

export default DataTable;
