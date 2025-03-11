import blogRoute from "./blog.js";

const router = (app) => {
  app.use("/", blogRoute);
};

export default router;
