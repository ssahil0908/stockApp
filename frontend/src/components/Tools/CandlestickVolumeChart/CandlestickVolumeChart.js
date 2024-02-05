import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const CandlestickVolumeChart = ({ frequency }) => {
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

  const displayCandlestickVolumeChart = async () => {
    try {
      const apiKey = 'demo';
      const symbol = 'IBM';

      const apiUrl = getApiUrl(frequency, apiKey, symbol);

      const response = await fetch(apiUrl);
      const data = await response.json();

      const chartData = processCandlestickVolumeData(data, frequency);
      const layout = {
        title: 'Candlestick and Volume Chart',
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
              { step: 'all' },
            ],
          },
        },
        yaxis: {
          autorange: true,
          title: 'Price',
        },
        yaxis2: {
          title: 'Volume',
          overlaying: 'y',
          side: 'right',
        },
      };

      var defaultPlotlyConfiguration = {
        modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d'],
        displaylogo: false,
        showTips: true,
      };

      Plotly.newPlot(chartContainerRef.current, chartData, layout, defaultPlotlyConfiguration);
    } catch (error) {
      console.error('Error fetching candlestick volume data:', error);
    }
  };

  const processCandlestickVolumeData = (data, frequency) => {
    const frequencyKey = getFrequencyKey(frequency);
    const dates = Object.keys(data[frequencyKey]).reverse();
    const candlestickData = dates.map((date) => {
      const dailyData = data[frequencyKey][date];
      return {
        date: new Date(date),
        open: parseFloat(dailyData['1. open']),
        high: parseFloat(dailyData['2. high']),
        low: parseFloat(dailyData['3. low']),
        close: parseFloat(dailyData['4. close']),
        volume: parseInt(dailyData['6. volume'], 10),
      };
    });

    const candlestickChartTrace = {
      x: candlestickData.map((item) => item.date),
      close: candlestickData.map((item) => item.close),
    //   decreasing: { line: { color: '#7F7F7F' } },
      high: candlestickData.map((item) => item.high),
    //   increasing: { line: { color: '#17BECF' } },
      line: { color: 'rgba(31,119,180,1)' },
      low: candlestickData.map((item) => item.low),
      open: candlestickData.map((item) => item.open),
      type: 'candlestick',
    };

    const volumeChartTrace = {
      x: candlestickData.map((item) => item.date),
      y: candlestickData.map((item) => item.volume),
      type: 'bar',
      yaxis: 'y2',
    //   marker: { color: 'rgba(55,128,191,0.7)' },
    };

    return [candlestickChartTrace, volumeChartTrace];
  };

  useEffect(() => {
    displayCandlestickVolumeChart();
}, [frequency]);

return <div ref={chartContainerRef} className="candlestick-volume-chart"></div>;
};

export default CandlestickVolumeChart;