const express = require("express");
const path = require("path");
const app = express();
const hbs = require("../node_modules/hbs");
const LogInCollection = require("../src/mongo");
const async = require("hbs/lib/async");
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const tempelatePath = path.join(__dirname, "../tempelates");
const publicPath = path.join(__dirname, "../public");
console.log(publicPath);

app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.static(publicPath));

// hbs.registerPartials(partialPath)

app.get("/signup", (req, res) => {
  return res.render("signup");
});

app.get("/", (req, res) => {
  return res.render("login");
});

app.get('/home', (req, res) => {
    res.render('home')
})


// app.post('/signup', async (req, res) => {

//     // const data = new LogInCollection({
//     //     name: req.body.name,
//     //     password: req.body.password
//     // })
//     // await data.save()

//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     }

//     console.log(data);

//     const checking = await LogInCollection.findOne({ name: req.body.name })

//    try{
//     if (checking.name === req.body.name && checking.password===req.body.password) {
//         return res.send("user details already exists")
//     }
//     else{
//         await LogInCollection.insertMany([{data}])
//     }
//    }
//    catch{
//       return res.send("wrong inputs")
//    }

//     res.status(201).render("home", {
//         naming: req.body.name
//     })
// })

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  if (!name || !password) {
    return res.render("signup", {
      error: "Name and password are required feilds",
    });
  }

  const existingUser = await LogInCollection.findOne({ name });

  if (existingUser) {
    return res.render("signup", {
      error: "User with the same name already exists",
    });
  }

  const newUser = new LogInCollection({ name, password });

  try {
    await newUser.save();
    res.status(201).redirect("http://localhost:3000/");
  } catch (error) {
    console.error("Error saving user:", error);
    res.render("signup", {
      error: "An error occurred while creating the user",
    });
  }
});

app.post("/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  try {
    const user = await LogInCollection.findOne({ name,password });
    
    if (user) {
      return res.redirect('/home');
    }
    else {
      return res.send("Not");
    }
  } catch (error) {
   
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login");
  }
});

app.listen(port, () => {
  console.log("port connected");
});
