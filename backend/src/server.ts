import express, { Express, Request, Response } from "express";

const app: Express = express();
app.use(express.json()); //user sended a obj so we handle it

interface Comment {
  writtenBy: string;
  content: string;
}

interface Story {
  name: string;
  likes: number;
  comments: Comment[];
}

const stories: Story[] = [
  { name: "Atomic-habits", likes: 0, comments: [] },
  { name: "Power-of-now", likes: 0, comments: [] },
  { name: "Thinking-fast-and-slow", likes: 0, comments: [] },
  { name: "Seven-habits", likes: 0, comments: [] },
  { name: "Mindset", likes: 0, comments: [] },
  { name: "Switch", likes: 0, comments: [] },
];

app.get("/stories/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  res.send(`You Cliked on ${name}`);
});

//likes increase
app.post("/api/stories/:name/like", (req: Request, res: Response) => {
  // if the user has send the req is the same with the one in server
  const story = stories.find((story) => story.name === req.params.name);
  story!.likes += 1;
  res.send(`Story ${req.params.name} has totally ${story!.likes}`);
});

// comments increase
app.post("/api/stories/:name/comments", (req: Request, res: Response) => {
  const { writtenBy, content } = req.body; //json confg bcs we send objt
  const story = stories.find((story) => story.name === req.params.name);
  // comments is an array and we add obj so we can know how wrote/and content
  story!.comments.push({
    writtenBy,
    content,
  });
  //sending a json req back to user - parse to JS obje to get out data
  res.json(story);
});

app.listen(3000, () => {
  console.log("Server is up BRO");
});
