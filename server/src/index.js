import express from 'express';
import cors from 'cors';
import { JSDOM } from 'jsdom';
import languageTags from 'language-tags';

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
  }

  // Create a JSDOM instance from the string
  const dom = new JSDOM(htmlString);
  const htmlElement = dom.window.document.documentElement;

  const langTag = htmlElement.hasAttribute('lang') &&
    htmlElement.getAttribute('lang').trim() !== '';
  if (langTag) {
    if (!languageTags(langTag).valid()) {
      response.send(`Invalid or unregistered BCP47 language tag: ${langTag}`);
    } else {
      response.send('The document contains a valid language tag.')
    }
  } else {
    response.send(`The document's primary language is not declared.`);
  }
});

export { app };