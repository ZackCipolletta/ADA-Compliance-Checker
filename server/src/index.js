import express from 'express';
import cors from 'cors';
import { JSDOM } from 'jsdom';
import checkLanguage from './rules/generalStructure/checkLanguage.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.post("/test", (request, response) => {
  const status = {
    "Status": "Running"
  };
  const htmlString = request.body.html;

  // check to verify that html string is actually present in body
  if (!htmlString) {
    return response.status(400).json({ error: 'No HTML provided' });
  } else {

    // Create a JSDOM instance from the string
    const dom = new JSDOM(htmlString);
    const htmlElement = dom.window.document.documentElement;

    const lang = checkLanguage(dom);

    response.send(lang);
  }
});

export { app };