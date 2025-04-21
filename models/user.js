const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");

// Schéma de l'utilisateur
const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [10000, "Code postal trop court"],
      max: 99999
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" }
  },
  {
    timestamps: true
  }
);

// Attribut virtuel pour le nom complet
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

// Hook pour associer un abonné existant à l'utilisateur
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.subscribedAccount) {
    mongoose.model("Subscriber").findOne({ email: user.email })
      .then(subscriber => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Erreur lors de la connexion avec l'abonné: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

// Ajout du plugin passport-local-mongoose
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email" // on utilise l'email comme identifiant de connexion
});

// Export du modèle
module.exports = mongoose.model("User", userSchema);
