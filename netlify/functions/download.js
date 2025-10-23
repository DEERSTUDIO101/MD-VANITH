const fetch = require('node-fetch');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // CORS Preflight
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

    // Extrahiere Track Info aus URL
    const trackId = url.match(/track\/([a-zA-Z0-9]+)/)?.[1];
    const albumId = url.match(/album\/([a-zA-Z0-9]+)/)?.[1];
    const playlistId = url.match(/playlist\/([a-zA-Z0-9]+)/)?.[1];

    // DEMO Response - funktioniert sofort!
    // Später kannst du hier eine echte API einbinden
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Track gefunden! ✅',
        tracks: [
          {
            title: 'Dein Spotify Song',
            artist: 'Backend läuft! 🎉 Jetzt API einbinden',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%231db954" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="30"%3E✅%3C/text%3E%3C/svg%3E',
            duration: '3:45',
            trackId: trackId || 'demo'
          }
        ]
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Backend Fehler: ' + error.message,
        success: false
      })
    };
  }
};
