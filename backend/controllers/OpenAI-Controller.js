const OpenAI = require("openai");
const axios = require("axios");
const dotenv=require("dotenv");
dotenv.config();
const alphaVantageApiKey = "demo";
//const openaiApiKey = "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";

async function fetchDataFromAlphaVantage() {
  try {
    const symbol = "IBM";
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${alphaVantageApiKey}`;
    const response = await axios.get(apiUrl);
    //console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Alpha Vantage:", error.message);
    throw error;
  }
}

async function getChatCompletion(prompt) {
  try {
    const openai = new OpenAI({ apiKey: process.env.openaiApiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "user", content: prompt }],
      stream: false,
    });
    return response;
  } catch (error) {
    console.error("Error interacting with GPT:", error.message);
  }
}
const openAIchat = async (req, res) => {
    try {
      console.log(req.body);
      const { userMessage } = req.body; 
      const response = await getChatCompletion(userMessage);
      const gptresponse= response.choices[0]?.message?.content || "No response from GPT"
       res.json({ response: `${gptresponse}` });
    } catch (error) {
      console.error('An error occurred:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const openAIanalyzeData = async (req, res) => {
    try {
      console.log(req.body);
      const searchInput  = req.body; 
      const alphaVantageData = await fetchDataFromAlphaVantage();
      const filteredData = Object.fromEntries(
        Object.entries(alphaVantageData["Weekly Adjusted Time Series"]).filter(
          ([date, _]) => date >= "2021-01-08",
        ),
      );
      alphaVantageData["Weekly Adjusted Time Series"] = filteredData;
  
      const prompt = JSON.stringify(alphaVantageData);
      const finalPrompt = `${prompt}\n\nSeeking insights from the available data, I aim to provide guidance on the viability of investing in the stocks of this particular company.`;
      //console.log(finalPrompt);
      const response = await getChatCompletion(finalPrompt);
      const gptResponse=response.choices[0]?.message?.content || "No response from GPT";
      res.json({ response: ` ${gptResponse}` });

    } catch (error) {
      console.error('An error occurred:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = { openAIchat , openAIanalyzeData };
