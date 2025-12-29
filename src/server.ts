import app from "./app.js";

const PORT = process.env.PORT || 3000;

export function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
