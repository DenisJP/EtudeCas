const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ['draft', 'published'], // Ajout de l'énumération pour le statut
    default: 'draft' // Optionnel: valeur par défaut si le statut n'est pas spécifié
  }
});

let Article;

module.exports = Article = model("Article", articleSchema);


/*async function test() {
  const articles = await Article.find().populate({
    path: "user",
    select: "-password",
    match: { name: /ben/i },
  });
  console.log(articles.filter((article) => article.user));
}

test();*/
