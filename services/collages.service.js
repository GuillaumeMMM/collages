import { google } from 'googleapis';

export const getCollages = async () => {
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        credentials: {
          "type": process.env.GOOGLE_API_TYPE,
          "project_id": process.env.GOOGLE_API_PROJECT_ID,
          "private_key_id": process.env.GOOGLE_API_PRIVATE_KEY_ID,
          "private_key": process.env.GOOGLE_API_PRIVATE_KEY.replace(/\\n/g, '\n'),
          "client_email": process.env.GOOGLE_API_CLIENT_EMAIL,
          "client_id": process.env.GOOGLE_API_CLIENT_ID,
          "auth_uri": process.env.GOOGLE_API_AUTH_URI,
          "token_uri": process.env.GOOGLE_API_TOKEN_URI,
          "auth_provider_x509_cert_url": process.env.GOOGLE_API_AUTH_PROVIDER_X509_CERT_URL,
          "client_x509_cert_url": process.env.GOOGLE_API_CLIENT_X509_CERT_URL,
          "universe_domain": process.env.GOOGLE_API_UNIVERSE_DOMAIN
        }
      })
    
      const sheet = google.sheets({ version: 'v4', auth });
    
      const range = `!A01:H100`;
    
      const response = await sheet.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range,
      });
    
      const collagesLines = response.data.values;

      let collages = [];
  
      (collagesLines || []).forEach((line, i) => {
        if (i > 0) {
          collages.push({
            title: line[0] || null,
            description: line[1] || null,
            imageUrl: line[2] || null,
            width: line[3] || null,
            height: line[4] || null,
            date: line[5] || null,
            displayedSize: line[6] || null,
            catalogUrl: line[7] || null
          });
        }
      });
    
      return collages.map(collage => {
        return {
          ...collage,
          width: Number(collage.width),
          height: Number(collage.height)
        }
      }).filter(collage => {
        return collage.width && collage.height && collage.width === collage.width && collage.height === collage.height && collage.imageUrl;
      });
}