import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

const addUser = (user) => {
  user['id'] = Math.floor(Math.random() * (1000000 - 0 + 1)) + 0
  users["users_list"].push(user);
  return user;
};

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/*

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});
*/

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job
  if (name != undefined) {
    let result1 = findUserByName(name);

      if(job != undefined) {
        let result2 = findUserByJob(job);
        let result = result1.filter(element => result2.includes(element));

        result = { users_list: result };
        res.send(result);
      }else{
        result1 = { users_list: result1 };
        res.send(result1);
      
      }
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.sendStatus(201);
  res.send(newUser)
});


app.delete("/users/:id", (req, res) => {
  const DelId = req.params.id.slice(1);
  const index = users["users_list"].findIndex(element => element["id"] === DelId);
  console.log(DelId);
  if (index !== -1) {
      users["users_list"].splice(index, 1);
      res.sendStatus(204);
  } else {
      res.sendStatus(404); 
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});