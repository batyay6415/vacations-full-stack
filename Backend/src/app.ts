import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import vacationRoutes from "./6-routes/vacation-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import authRoute from "./6-routes/auth-routes";
import followRoute from "./6-routes/follow-routes";
import consoleLogger from "./3-middleware/console-logger";
import fileLogger from "./3-middleware/file-logger";

const server = express();

// CORS: 
server.use(cors({ origin: "http://localhost:3000" }));

server.use(express.json());

server.use(expressFileUpload());

server.use("/api", vacationRoutes);
server.use("/api" , authRoute);
server.use("/api", followRoute);

// Register middleware for all routes: 
server.use(routeNotFound);
server.use(consoleLogger);
server.use(fileLogger);

server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));

// For testing it in any related test.ts file
export default {
    server
};
