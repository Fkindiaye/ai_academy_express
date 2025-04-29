const User = require("../models/user");

// Fonction utilitaire pour extraire les paramètres utilisateur du corps de la requête
const getUserParams = body => {
  return {
    name: {
      first: body.first,
      last: body.last
    },
    email: body.email,
    password: body.password,
    zipCode: body.zipCode
  };
};

module.exports = {
  // Récupère tous les utilisateurs
  index: (req, res, next) => {
    User.find({})
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération des utilisateurs : ${error.message}`);
        next(error);
      });
  },

  // Affiche la vue avec la liste des utilisateurs
  indexView: (req, res) => {
    res.render("users/index");
  },

  // Affiche le formulaire de création d’un nouvel utilisateur
  new: (req, res) => {
    res.render("users/new");
  },

  // Crée un nouvel utilisateur
  create: (req, res, next) => {
    const userParams = getUserParams(req.body);
    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.error(`Erreur lors de la création de l'utilisateur : ${error.message}`);
        res.locals.redirect = "/users/new";
        next();
      });
  },

  // Redirige vers une autre vue selon le chemin stocké
  redirectView: (req, res, next) => {
    const redirectPath = res.locals.redirect;
    if (redirectPath) {
      res.redirect(redirectPath);
    } else {
      next();
    }
  },

  // Affiche les détails d’un utilisateur
  show: (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération de l'utilisateur par ID : ${error.message}`);
        next(error);
      });
  },

  // Vue pour afficher un utilisateur
  showView: (req, res) => {
    res.render("users/show");
  },

  // Affiche le formulaire d’édition pour un utilisateur
  edit: (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user: user
        });
      })
      .catch(error => {
        console.error(`Erreur lors de la récupération de l'utilisateur pour édition : ${error.message}`);
        next(error);
      });
  },

  // Met à jour les données d’un utilisateur
  update: (req, res, next) => {
    const userId = req.params.id;
    const userParams = getUserParams(req.body);
    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
        next(error);
      });
  },

  // Supprime un utilisateur
  delete: (req, res, next) => {
    const userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.error(`Erreur lors de la suppression de l'utilisateur : ${error.message}`);
        next(error);
      });
  }
};
