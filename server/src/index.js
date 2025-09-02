import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});


app.get("/status", (request, response) => {
const status = {
  "Status": "Running"
};

response.send(status);
});


// async function analyzeHTML(data) {
  
//   const response = await fetch(url, {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(data),
//     });

// };

// export default analyzeHTML;