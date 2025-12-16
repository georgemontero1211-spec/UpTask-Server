import app from "./server";
import colors from "colors";
import dotnev from 'dotenv'
dotnev.config()

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    colors.blue.bold(
      `REST API server ready at:${colors.green.bold(
        `http://localhost:` + port + "/"
      )}`
    )
  );
  console.log(process.env.FRONTEND_URL);
  
});
