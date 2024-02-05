// Import necessary React and Plotly modules
import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

// Define the OhlcChart component
const OhlcChart = ({ frequency }) => {
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

  // Function to fetch and display OHLC chart
  const displayOHLCChart = async () => {
    try {
      // Replace 'demo' with your actual API key
      const apiKey = 'demo';
      const symbol = 'IBM'; 

      // Update API URL based on the selected frequency
      const apiUrl = getApiUrl(frequency, apiKey, symbol);

      // Fetch data based on the API URL
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Process and display OHLC chart using Plotly
      const chartData = processOHLCData(data, frequency);
      const layout = {
        title: 'OHLC Chart',
        
        dragmode: 'zoom',
      showlegend: false,
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
        title: 'Price',
      },
      };
      // hide the modebar (hover bar) buttons, plotly logo. show plotly tooltips
    var defaultPlotlyConfiguration = { modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d'], displaylogo: false, showTips: true };
  
      Plotly.newPlot(chartContainerRef.current, chartData, layout,defaultPlotlyConfiguration);
    } catch (error) {
      console.error('Error fetching OHLC data:', error);
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

  // Function to process OHLC data
  const processOHLCData = (data, frequency) => {
    // Process data as needed and return the formatted data for OHLC chart
    const frequencyKey = getFrequencyKey(frequency);
    const dates = Object.keys(data[frequencyKey]).reverse();
    const ohlcData = dates.map((date) => {
      const dailyData = data[frequencyKey][date];
      return {
        date: new Date(date),
        open: parseFloat(dailyData['1. open']),
        high: parseFloat(dailyData['2. high']),
        low: parseFloat(dailyData['3. low']),
        close: parseFloat(dailyData['4. close']),
      };
    });

    // Format data for Plotly OHLC chart
    const ohlcChartTrace = {
      x: ohlcData.map((item) => item.date),
      close: ohlcData.map((item) => item.close),
      decreasing: { line: { color: '#7F7F7F' } },
      high: ohlcData.map((item) => item.high),
      increasing: { line: { color: '#17BECF' } },
      line: { color: 'rgba(31,119,180,1)' },
      low: ohlcData.map((item) => item.low),
      open: ohlcData.map((item) => item.open),
      type: 'ohlc',
    };

    return [ohlcChartTrace];
  };

  // useEffect to fetch and display OHLC chart on component mount and when frequency changes
  useEffect(() => {
    displayOHLCChart();
  }, [frequency]);

  return <div ref={chartContainerRef} className="ohlc-chart"></div>;
};

export default OhlcChart;
