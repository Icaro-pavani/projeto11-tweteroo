import express from "express";
import cors from "cors";
import chalk from "chalk";

function validURL(str) {
  if (str != null && str != "") {
    const regex =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str);
  }
  return false;
}

let users = [];
let tweets = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub",
  },
];

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (username.length !== 0 && avatar.length !== 0) {
    if (validURL(avatar)) {
      users.push(req.body);
      res.send("OK");
    } else {
      res.status(400).send("Adicione um link válido para a imagem!");
    }
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});

app.get("/tweets", (req, res) => {
  const { page } = req.query;
  if (page > 0) {
    if (tweets.length < 11) {
      res.send(tweets);
    } else {
      const tweetsToSend = tweets.slice(
        tweets.length - page * 10,
        tweets.length - (page - 1) * 10
      );
      res.send(tweetsToSend);
    }
  } else {
    res.status(400).send("Informe uma página válida!");
  }
});

app.get("/tweets/:userId", (req, res) => {
  const { userId } = req.params;
  const userTweets = tweets.filter((tweet) => tweet.username === userId);
  res.send(userTweets);
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const { user } = req.headers;
  if (tweet.length !== 0 && user.length !== 0) {
    const userInfo = users.find((oneUser) => oneUser.username === user);
    tweets.push({
      username: user,
      avatar: userInfo.avatar,
      tweet,
    });
    res.status(201).send("OK");
  } else {
    res.status(400).send("Todos os campos são obrigatórios!");
  }
});

app.listen("5000", () => console.log(chalk.bold.green("API running...")));
