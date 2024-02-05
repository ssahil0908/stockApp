import React, { useEffect, useState } from 'react';

const CompanyInformation = ({ symbol }) => {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const apiKey = 'demo';
       const symbol0= symbol || 'IBM'
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol0}&apikey=${apiKey}`);
        const data = await response.json();
        setCompanyData(data);
      } catch (error) {
        console.error('Error fetching company information:', error);
      }
    };

    fetchCompanyData();
  }, [symbol]);

  if (!companyData) {
    return <p>Loading company information...</p>;
  }

  return (
    <div className="company-info">
      <h2>{companyData.Name} ({companyData.Symbol})</h2>
      <p className="description">{companyData.Description}</p>
      <ul>
        <li><strong>Exchange:</strong> {companyData.Exchange}</li>
        <li><strong>Currency:</strong> {companyData.Currency}</li>
        <li><strong>Sector:</strong> {companyData.Sector}</li>
        <li><strong>Industry:</strong> {companyData.Industry}</li>
      </ul>
    </div>
  );
};

export default CompanyInformation;
