const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Contrôleurs
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");

const app = express();

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/ai_academy", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connexion réussie à MongoDB en utilisant Mongoose!");
});

// Définir le port
app.set("port", process.env.PORT || 3000);

// Configuration du moteur de vue EJS avec express-ejs-layouts
app.set("view engine", "ejs");
app.use(layouts);
app.set("layout", "layout"); // Fichier layout.ejs dans /views

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(express.static("public"));

// Middleware global pour définir un titre de page par défaut
app.use((req, res, next) => {
  res.locals.pageTitle = res.locals.pageTitle || "AI Academy";
  next();
});

// Routes principales
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/courses", homeController.coursesPage);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);

// Routes abonnés
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/subscribers/new", subscribersController.getSubscriptionPage);
app.post("/subscribers/create", subscribersController.saveSubscriber);
app.get("/subscribers/:id", subscribersController.show);
app.post("/subscribers/delete/:id", subscribersController.deleteSubscriber);

// Routes utilisateurs
app.get("/users", usersController.index, usersController.indexView);
app.get("/users/new", usersController.new);
app.post("/users/create", usersController.create, usersController.redirectView);
app.get("/users/:id", usersController.show, usersController.showView);
app.get("/users/:id/edit", usersController.edit);
app.put("/users/:id/update", usersController.update, usersController.redirectView);
app.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

// Routes cours
app.get("/courses", coursesController.index, coursesController.indexView);
app.get("/courses/new", coursesController.new);
app.post("/courses/create", coursesController.create, coursesController.redirectView);
app.get("/courses/:id", coursesController.show, coursesController.showView);
app.get("/courses/:id/edit", coursesController.edit);
app.put("/courses/:id/update", coursesController.update, coursesController.redirectView);
app.delete("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

// Gestion des erreurs
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Lancement du serveur
app.listen(app.get("port"), () => {
  console.log(`Serveur démarré : http://localhost:${app.get("port")}`);
});
