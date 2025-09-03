import express from 'express';
import cors from 'cors';

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
    const input = request.body.input;
    response.send("user input: " + input);
  });

export {app};