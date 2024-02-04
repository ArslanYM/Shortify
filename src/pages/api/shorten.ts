import dbConnect from '../../utils/dbConnect';
import Url from '../../models/Url';
import shortid from 'shortid';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res : NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const { originalUrl } = req.body;

    // Check if the URL is valid
    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
      // Check if the URL is already in the database
      let url = await Url.findOne({ originalUrl });

      if (!url) {
        // Generate a short URL using shortid library
        const shortUrl = 'http://yourdomain/' + shortid.generate();

        // Save the URL in the database
        url = new Url({ originalUrl, shortUrl });
        await url.save();
      }

      return res.json(url);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

// Function to validate URLs using a regular expression
function isValidUrl(url:string) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}
