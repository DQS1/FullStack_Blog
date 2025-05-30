import authRoutes from "./auth.route.js";
import blogRoute from "./blog.route.js";

const router = (app) => {
  app.use("/", blogRoute);
  app.use("/auth", authRoutes);
};

export default router;
