
import React, { useEffect, useState } from 'react';
import OhlcChart from './Ohlcchart/Ohlcchart';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Tools.css';
import LineChart from './LineChart/LineChart';
import VolumeChart from './VolumeChart/VolumeChart';
import CandlestickChart from './CandlestickChart/CandlestickChart';
import CandlestickVolumeChart from './CandlestickVolumeChart/CandlestickVolumeChart';
import ScatterChart from './ScatterChart/ScatterChart';
//import DataTable from './DataTable/DataTable';
import Table from './DataTable/DataTable';
import CompanyInformation from './CompanyInformation/CompanyInformation';
const Tools = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [frequency, setFrequency] = useState('daily');
  const [selectedTool, setSelectedTool] = useState('info');
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');



  const fetchCompanyInformation = async (symbol) => {
    try {
      const apiKey = 'demo';
      const symbol0 = 'IBM';

      const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol0}&apikey=${apiKey}`);
      const data = await response.json();
      //console.log(data);
      const companyInformation = {
        Name: data.Name,
        Description: data.Description,
        Symbol: data.Symbol,
      };

      setCompanyInfo(companyInformation);
    } catch (error) {
      console.error('Error fetching company information:', error);
    }
  };

  const handleFrequencyChange = (event) => {
    const selectedFrequency = event.target.value;
    setFrequency(selectedFrequency);
  };

  const handleToolSelection = (tool) => {
    setSelectedTool(tool);
  };

  // const handleSearch = async (keywords) => {
  //   try {
  //     const apiKey = 'XU5MEWM04LFE9EPM';
  //     //const keywords = 'tesco';
  //     const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`);
  //     const data = await response.json();

  //     setSearchResults(data.bestMatches);
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   }
  // };


  useEffect(() => {
    fetchCompanyInformation('IBM');
  }, []);

  return (
    <div className="main-container">
      <div className="container-fluid content-container">
        <div className="row">
          <div className="col-md-3">
            <div className="search-bar">
              <input type="text" id="companySymbol" placeholder="e.g., IBM" value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}/>
              <button className="btn btn-primary" onClick={() => fetchCompanyInformation(searchInput)}>Search</button>
            </div>

              {/* <div className="search-bar">
              <input
                type="text"
                id="companySymbol"
                placeholder="e.g., IBM"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="btn btn-primary" onClick={() => fetchCompanyInformation('IBM')}>
                Search
              </button>
            </div>
            <div className="search-results">
              <ul className="list-group">
                {searchResults.map((result) => (
                  <li
                    key={result['1. symbol']}
                    className="list-group-item"
                    onClick={() => fetchCompanyInformation(result['1. symbol'])}
                  >
                    {result['2. name']} ({result['1. symbol']})
                  </li>
                ))}
              </ul>
            </div> */}

            <div className="frequency-selector">
              <label htmlFor="frequency">Select Frequency:</label>
              <select className="form-select" id="frequency" value={frequency} onChange={handleFrequencyChange}>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="intraday">Intraday</option>
              </select>
            </div>
            <div className="tools">
              {/* <h2>Tools</h2> */}
              <ul className="list-group">
              <li className={`list-group-item ${selectedTool === 'info' ? 'active' : ''}`} onClick={() => handleToolSelection('info')}>Company Information</li>
                <li className={`list-group-item ${selectedTool === 'ohlc' ? 'active' : ''}`} onClick={() => handleToolSelection('ohlc')}>OHLC</li>
                <li className={`list-group-item ${selectedTool === 'line' ? 'active' : ''}`} onClick={() => handleToolSelection('line')}>Line Chart</li>
                <li className={`list-group-item ${selectedTool === 'volume' ? 'active' : ''}`} onClick={() => handleToolSelection('volume')}>Volume Chart</li>
                <li className={`list-group-item ${selectedTool === 'candlestick' ? 'active' : ''}`} onClick={() => handleToolSelection('candlestick')}>Candlestick Chart</li>
                <li className={`list-group-item ${selectedTool === 'candlestickVolume' ? 'active' : ''}`} onClick={() => handleToolSelection('candlestickVolume')}>Candlestick Volume Chart</li>
                <li className={`list-group-item ${selectedTool === 'scatter' ? 'active' : ''}`} onClick={() => handleToolSelection('scatter')}>Scatter Plot</li>
                <li className={`list-group-item ${selectedTool === 'datatable' ? 'active' : ''}`} onClick={() => handleToolSelection('datatable')}>Data Table</li>

              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="chart-container">
              <div className="chart-section">
                {selectedTool === 'info' && <CompanyInformation symbol={searchInput} />}
                {selectedTool === 'ohlc' && <OhlcChart frequency={frequency} />}
                {selectedTool === 'line' && <LineChart frequency={frequency} />}
                {selectedTool === 'volume' && <VolumeChart frequency={frequency} />}
                {selectedTool === 'candlestick' && <CandlestickChart frequency={frequency} />}
                {selectedTool === 'candlestickVolume' && <CandlestickVolumeChart frequency={frequency} />}
                {selectedTool === 'scatter' && <ScatterChart frequency={frequency} />}
                {selectedTool === 'datatable' && <Table frequency={frequency} />}
                {/* Add more conditionals for other tools as needed */}
              </div>
              {/* {companyInfo && (
                <div className="company-info">
                  <h2>{companyInfo.Name} ({companyInfo.Symbol})</h2>
                  <p className="description">{companyInfo.Description}</p>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
