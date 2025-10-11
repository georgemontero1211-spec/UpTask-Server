import app from "./server";
import colors from "colors";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    colors.blue.bold(
      `REST API server ready at:${colors.green.bold(
        `http://localhost:` + port + "/"
      )}`
    )
  );
});
