// Import necessary React and Plotly modules
import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

// Define the LineChart component
const LineChart = ({ frequency }) => {
  // Reference to the chart container
  const chartContainerRef = useRef(null);

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

  // Function to fetch and display Line chart
  const displayLineChart = async () => {
    try {
      // Replace 'demo' with your actual API key
      const apiKey = 'demo';
      const symbol = 'IBM'; // You can change this to the desired symbol

      // Update API URL based on the selected frequency
      const apiUrl = getApiUrl(frequency, apiKey, symbol);

      // Fetch data based on the API URL
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Process and display Line chart using Plotly
      const chartData = processLineChartData(data, frequency);
      const layout = {
        title: 'Line Chart',
        dragmode: 'zoom',
        showlegend: true,
      xaxis: {
        autorange: true,
        title: 'Date',
        rangeselector: {
          buttons: [
            { count: 1, label: '1m', step: 'month', stepmode: 'backward' },
            { count: 6, label: '6m', step: 'month', stepmode: 'backward' },
            { count: 1, label: '1y', step: 'year', stepmode: 'backward' },
            { step: 'all' }
          ]
        }
      },
      yaxis: {
        autorange: true,
        title: 'Closing Price',
      },
      };
      // hide the modebar (hover bar) buttons, plotly logo. show plotly tooltips
    var defaultPlotlyConfiguration = { modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d'], displaylogo: false, showTips: true };
  
      Plotly.newPlot(chartContainerRef.current, chartData, layout,defaultPlotlyConfiguration);
    } catch (error) {
      console.error('Error fetching Line chart data:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

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

  // Function to process Line chart data
  const processLineChartData = (data, frequency) => {
    // Process data as needed and return the formatted data for Line chart
    const frequencyKey = getFrequencyKey(frequency);
    const dates = Object.keys(data[frequencyKey]).reverse();
    const lineData = dates.map((date) => {
      const dailyData = data[frequencyKey][date];
      return {
        date: new Date(date),
        value: parseFloat(dailyData['4. close']), // Adjust this according to your data
      };
    });

    // Format data for Plotly Line chart
    const lineChartTrace = {
      x: lineData.map((item) => item.date),
      y: lineData.map((item) => item.value),
      type: 'scatter',
    //   mode: 'lines+markers',
    mode: 'lines',
      line: { color: 'rgba(31,119,180,1)' },
      marker: { color: '#17BECF' },
      name: 'Closing Prices',
    };

    return [lineChartTrace];
  };

  // useEffect to fetch and display Line chart on component mount and when frequency changes
  useEffect(() => {
    displayLineChart();
  }, [frequency]);

  return <div ref={chartContainerRef} className="line-chart"></div>;
};

export default LineChart;
