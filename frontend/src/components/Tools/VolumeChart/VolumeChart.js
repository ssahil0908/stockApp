import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const VolumeChart = ({ frequency }) => {
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

  const processAndDisplayVolumeChart = (data) => {
    const frequencyKey = getFrequencyKey(frequency);
    const DailyTimeSeries = data[frequencyKey];
    const dates = Object.keys(DailyTimeSeries).reverse();

    const trace = {
      x: dates,
      y: dates.map((date) => parseFloat(DailyTimeSeries[date]['6. volume'])),
      type: 'bar',
      name: 'Trading Volume',
    };

    const data1 = [trace];

    const layout = {
      dragmode: 'zoom',
      showlegend: true,
      title: 'Trading Volume Bar Chart',
      xaxis: {
        autorange: true,
        title: 'Date',
        rangeselector: {
          buttons: [
            { count: 1, label: '1m', step: 'month', stepmode: 'backward' },
            { count: 6, label: '6m', step: 'month', stepmode: 'backward' },
            { count: 1, label: '1y', step: 'year', stepmode: 'backward' },
            { step: 'all' },
          ],
        },
      },
      yaxis: {
        autorange: true,
        title: 'Trading Volume',
      },
    };
// hide the modebar (hover bar) buttons, plotly logo. show plotly tooltips
var defaultPlotlyConfiguration = { modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d'], displaylogo: false, showTips: true };
  
    Plotly.newPlot(chartContainerRef.current, data1, layout,defaultPlotlyConfiguration);
  };

  const displayVolumeChart = async () => {
    try {
      const apiKey = 'demo';
      const symbol = 'IBM';
      const apiUrl = getApiUrl(frequency, apiKey, symbol);

      const response = await fetch(apiUrl);
      const data = await response.json();

      processAndDisplayVolumeChart(data);
    } catch (error) {
      console.error('Error fetching volume data:', error);
    }
  };

  useEffect(() => {
    displayVolumeChart();
  }, [frequency]);

  return <div ref={chartContainerRef} className="volume-chart"></div>;
};

export default VolumeChart;
