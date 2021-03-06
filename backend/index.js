const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const loginRouter = require("./routes/login");
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const categoryRouter = require("./routes/category");
const productsRouter = require("./routes/products");
app.use("/category", categoryRouter);
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/products", productsRouter);
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
