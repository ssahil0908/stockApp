import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const ScatterChart = ({ frequency }) => {
  const chartContainerRef = useRef(null);

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

  const displayScatterChart = async () => {
    try {
      const apiKey = 'demo';
      const symbol = 'IBM';

      const apiUrl = getApiUrl(frequency, apiKey, symbol);

      const response = await fetch(apiUrl);
      const data = await response.json();

      const chartData = processScatterChartData(data, frequency);
      const layout = {
        title: 'Scatter Plot: Open vs Close',
        xaxis: {
          title: 'Open Price',
        },
        yaxis: {
          title: 'Close Price',
        },
      };

      var defaultPlotlyConfiguration = {
        modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d'],
        displaylogo: false,
        showTips: true,
      };

      Plotly.newPlot(chartContainerRef.current, chartData, layout, defaultPlotlyConfiguration);
    } catch (error) {
      console.error('Error fetching data for scatter plot:', error);
    }
  };

  const processScatterChartData = (data, frequency) => {
    const frequencyKey = getFrequencyKey(frequency);
    const dates = Object.keys(data[frequencyKey]).reverse();
    const ScatterChartData = dates.map((date) => {
      const dailyData = data[frequencyKey][date];
      return {
        date: new Date(date),
        open: parseFloat(dailyData['1. open']),
        close: parseFloat(dailyData['4. close']),
        hoverText: `Date: ${date}<br>Open: ${dailyData['1. open']}<br>Close: ${dailyData['4. close']}`,
      };
    });
  
    const ScatterChartTrace = {
      x: ScatterChartData.map((item) => item.open),
      y: ScatterChartData.map((item) => item.close),
      mode: 'markers',
      type: 'scatter',
      text: ScatterChartData.map((item) => item.hoverText),
      hoverinfo: 'text',
      marker: { color: 'rgba(31,119,180,0.7)', size: 8 },
    };
  
    return [ScatterChartTrace];
  };
  
  useEffect(() => {
    displayScatterChart();
  }, [frequency]);

  return <div ref={chartContainerRef} className="scatter-plot"></div>;
};

export default ScatterChart;
