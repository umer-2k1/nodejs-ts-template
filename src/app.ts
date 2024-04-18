import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ApiError from "./utils/ApiError";
import loggerMiddleware from "./middleware/loggerMiddleware";
import swaggerFile from "../swagger_output.json"; // Generated Swagger file
import swaggerUi from "swagger-ui-express";
import router from "./router";
import { handleInvalidRoute } from "./middleware/invalidRoute";
import mongoSanitize from "express-mongo-sanitize";


const app = express();
// Middlewares
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);
app.use(handleInvalidRoute);

// Apply mongoSanitize middleware
app.use(mongoSanitize());
app.use(
  mongoSanitize({
    replaceWith: "",
  })
);


// router index
app.use("/", router);
// api doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req: Request, res: Response) => {
  res.send("Nodejs-Typescript-template");
});

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, "Not found"));
});

export default app;
