import express from "express";
import cors from "cors";
import chalk from "chalk";

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
  users.push(req.body);
  res.send("OK");
});

app.get("/tweets", (req, res) => {
  if (tweets.length > 10) {
    res.send(tweets.slice(-10));
  } else {
    res.send(tweets);
  }
});

app.post("/tweets", (req, res) => {
  const tweetData = req.body;
  const user = users.find((user) => user.username === tweetData.username);
  tweets.push({
    username: user.username,
    avatar: user.avatar,
    tweet: tweetData.tweet,
  });
  res.send("OK");
});

app.listen("5000", () => console.log(chalk.bold.green("API running...")));
