import express from 'express';
import cors from 'cors';
import { JSDOM } from 'jsdom';
import checkLanguage from './rules/generalStructure/checkLanguage.js';
import checkTitle from './rules/generalStructure/title.js';
import colorContrast from './rules/generalStructure/colorContrast.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.post("/test", (request, response) => {
  try {
    const htmlString = request.body.html;

    // check to verify that html string is actually present in body
    if (!htmlString) {
      return response.status(400).json({ error: 'No HTML provided' });
    }

    // Create a JSDOM instance from the string
    const dom = new JSDOM(htmlString);

    const lang = checkLanguage(dom);
    const title = checkTitle(dom);
    const contrast = colorContrast(dom)
    // const colorContrast = checkColorContrast(dom);



    // Return result or empty object if null
    response.status(200).json(contrast);

    // handle errors gracefully
  } catch (error) {
    console.error('Backend error: ', error);
    response.status(500).json({ error: 'Internal server error' });
  }

});

export { app };