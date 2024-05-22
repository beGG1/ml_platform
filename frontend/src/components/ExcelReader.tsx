import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './ExcelReader.css'; // Import the CSS file

const ExcelReader = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filters, setFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/filter/');
      setFilters(response.data.filters);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
      setColumns(Object.keys(jsonData[0])); // Get column names
      setSelectedColumns(Object.keys(jsonData[0])); // Select all columns by default
    };

    reader.readAsArrayBuffer(file);
  };

  const handleColumnSelection = (event) => {
    const column = event.target.name;
    const isChecked = event.target.checked;

    setSelectedColumns((prevSelectedColumns) =>
      isChecked
        ? [...prevSelectedColumns, column]
        : prevSelectedColumns.filter((col) => col !== column)
    );
  };

  const handleFilterChange = (column, filter) => {
    setColumnFilters((prevColumnFilters) => ({
      ...prevColumnFilters,
      [column]: filter,
    }));
  };

  return (
    <div>
      <h1>Upload Excel File</h1>
      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />

      {columns.length > 0 && (
        <div className="checkbox-container">
          <h2>Select Columns to Display</h2>
          {columns.map((column) => (
            <div key={column} className="checkbox-item">
              <label>
                <input
                  type="checkbox"
                  name={column}
                  checked={selectedColumns.includes(column)}
                  onChange={handleColumnSelection}
                />
                {column}
              </label>
              {selectedColumns.includes(column) && (
                <select
                  onChange={(e) => handleFilterChange(column, e.target.value)}
                  value={columnFilters[column] || ''}
                >
                  <option value="">Select Filter</option>
                  {filters.map((filter) => (
                    <option key={filter.name} value={filter.name}>
                      {filter.description}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      )}

      {data.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {selectedColumns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {selectedColumns.map((column) => (
                    <td key={column}>{row[column]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filters.length > 0 && (
        <div className="filter-table-container">
          <h2>Filters</h2>
          <table>
            <thead>
              <tr>
                <th>Filter Name</th>
                <th>Description</th>
                <th>Inputs</th>
              </tr>
            </thead>
            <tbody>
              {filters.map((filter) => (
                <tr key={filter.name}>
                  <td>{filter.name}</td>
                  <td>{filter.description}</td>
                  <td>
                    {filter.inputs.map((input, index) => (
                      <div key={index}>
                        {input.name} ({input.input_type})
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExcelReader;
