import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});


app.post("/test", (request, response) => {
const status = {
  "Status": "Running"
};
const name = request.body.name
response.send("hello: " + name);
});


// async function analyzeHTML(data) {
  
//   const response = await fetch(url, {
//       method: 'POST',
//       headers: headers,
//       body: JSON.stringify(data),
//     });

// };

// export default analyzeHTML;