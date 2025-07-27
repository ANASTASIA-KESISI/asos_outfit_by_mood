// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const moodMap = {
  happy: ["yellow", "casual dress", "floral"],
  romantic: ["lace", "pastel", "silk dress"],
  edgy: ["leather jacket", "black jeans", "boots"],
  cozy: ["sweater", "neutral", "oversized"],
  chill: ["loungewear", "tracksuit", "hoodie"]
};

async function getOutfitsByMood(mood) {
    console.log(mood);
  const keywords = moodMap[mood];
  const query = keywords[Math.floor(Math.random() * keywords.length)];
  
  return query;
}

// Serve static files from React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

//test
app.get('/api/asos/:mood', async (req, res) => {
//console.log(mood);
console.log(req.params.mood);
  _query = getOutfitsByMood(req.params.mood);
  //const url = 'https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&country=US&sort=freshness&currency=USD&sizeSchema=US&limit=48&lang=en-US';
  const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&q=${_query}&limit=12`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_ASOS_API_KEY, 
      'x-rapidapi-host': 'asos2.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // or .text() if needed
    return res.json(result);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch ASOS data' });
  }
});

// Catch-all to serve SPA
app.get('/{*something}', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


