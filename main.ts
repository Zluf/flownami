// @ts-types="npm:@types/express"
import express from "npm:express";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (_req, res) {
  res.render("pages/index");
});

type Task = {
  name: string;
};

type Column = {
  name: string;
  tasks: Array<Task>;
};

app.get("/board", async function (_req, res) {
  const columns = await readTasks();
  res.render("pages/board", { columns });
});

app.get("/tasks/new", (_req, res) => {
  res.render("pages/create");
});

app.delete("/tasks/:columnId/:taskId", async (_req, res) => {
  const { columnId, taskId } = _req.params;

  const columns = await readTasks();

  const clmnIndex = columns.findIndex(clmn => clmn.name === columnId)

  const taskIndex = columns[clmnIndex].tasks.findIndex(task => task.name === taskId)

  columns[clmnIndex].tasks.splice(taskIndex, 1)

  console.log(columns)

  await writeTasks(columns);

  res.redirect("/board");
});

async function writeTasks(tasks: Task[]) {
  await Deno.writeTextFile("./data.json", JSON.stringify(tasks));
}

async function readTasks() {
  const data = await Deno.readTextFile("./data.json");
  return JSON.parse(data);
}


app.post("/tasks", async (req, res) => {
  const taskName = req.body.taskName;

  const newTask = { name: taskName };

  const columns = await readTasks();

  columns[0].tasks.push(newTask);

  await writeTasks(columns);

  res.redirect("/board");
});

if (import.meta.main) {
  const port = Deno.env.get("PORT") || 8080;
  app.listen(port);
  console.log(`Server is listening on port ${port}`);
}

export default app;
