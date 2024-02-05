import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';

const DataTable = ({ frequency }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'demo' with your actual API key
        const apiKey = 'demo';
        const symbol = 'IBM'; // You can change this to the desired symbol

        // Update API URL based on the selected frequency
        const apiUrl = getApiUrl(frequency, apiKey, symbol);

        // Fetch data based on the API URL
        const response = await fetch(apiUrl);
        const responseData = await response.json();

        // Process data
        const frequencyKey = getFrequencyKey(frequency);
        const processedData = responseData[frequencyKey];

        // Update state with processed data
        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error, e.g., display an error message to the user
      }
    };

    fetchData();
  }, [frequency]);

  // Function to get the API URL based on the selected frequency
  const getApiUrl = (frequency, apiKey, symbol) => {
    switch (frequency) {
      case 'daily':
        return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;
      case 'monthly':
        return `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;
      case 'intraday':
        return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
      case 'weekly':
        return `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;
      default:
        return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;
    }
  };

  // Function to get the frequency key based on the selected frequency
  const getFrequencyKey = (frequency) => {
    switch (frequency) {
      case 'daily':
        return 'Time Series (Daily)';
      case 'monthly':
        return 'Monthly Time Series';
      case 'intraday':
        return 'Time Series (5min)';
      case 'weekly':
        return 'Weekly Adjusted Time Series';
      default:
        return 'Time Series (Daily)';
    }
  };

  useEffect(() => {
    processAndDisplayDataTable();
  }, [data]);

  const processAndDisplayDataTable = () => {
    // Create a new table element
    const table = $('#dataTable').DataTable({
      destroy: true, // Destroy existing DataTable (if any)
      data: Object.entries(data).map(([date, entry]) => ({
        date,
        open: entry['1. open'],
        high: entry['2. high'],
        low: entry['3. low'],
        close: entry['4. close'],
        volume: entry['6. volume'],
      })),
      columns: [
        { title: 'Date', data: 'date' },
        { title: 'Open', data: 'open' },
        { title: 'High', data: 'high' },
        { title: 'Low', data: 'low' },
        { title: 'Close', data: 'close' },
        { title: 'Volume', data: 'volume' },
      ],
    });
  };

  return (
    <div>
      <h2>Data Table</h2>
      <table id="dataTable" className="display" style={{ width: '100%' }}></table>
    </div>
  );
};

export default DataTable;
