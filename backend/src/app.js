import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import rfpRouter from "./routes/rfp.routes.js";
import vendorRouter from "./routes/vendor.routes.js"
import rfpDispatchRouter from "./routes/rfpdispatch.routes.js"
import proposalRouter from "./routes/proposal.routes.js"


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/rfp", rfpRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/rfp-dispatch", rfpDispatchRouter);
app.use("/api/proposal", proposalRouter)

app.get("/health", (_req, res) => {
  res.json({ status: "✅ Backend is healthy" });
});

export default app;
