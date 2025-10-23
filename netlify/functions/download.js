exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { url } = JSON.parse(event.body);

    if (!url || !url.includes('spotify.com')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Ungültige Spotify URL' })
      };
    }

    // Extrahiere Track-ID aus Spotify URL
    const trackId = url.match(/track\/([a-zA-Z0-9]+)/)?.[1];
    
    // Demo Response (später mit echter API ersetzen)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Track gefunden!',
        tracks: [
          {
            title: 'Track wird verarbeitet...',
            artist: 'Backend ist aktiv! 🎉',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect fill="%231db954" width="64" height="64"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="30">✅</text></svg>',
            duration: '3:45',
            trackId: trackId
          }
        ]
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
