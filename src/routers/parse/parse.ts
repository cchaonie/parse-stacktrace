import https from 'https';
import { Router } from 'express';

import { parse } from '../../services';

export const parseRoute = Router();

parseRoute.post('/parse', (req, res) => {
  const { sourceMapUrl, errorTrace } = req.body;

  https.get(sourceMapUrl, clientRes => {
    clientRes.setEncoding('utf8');
    let rawData = '';
    clientRes.on('data', chunk => {
      rawData += chunk;
    });
    clientRes.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);

        parse(parsedData, errorTrace).then(data =>
          res.status(200).json({
            message: 'OK',
            data,
          })
        );
      } catch (e) {
        console.error(e.message);
      }
    });
  });
});
