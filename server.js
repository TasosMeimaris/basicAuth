const express = require("express");
const jwt = require("jsonwebtoken");
const dbConnect = require("./db/dbConnect");
const Post = require("./db/postModel")
const User = require("./db/userModel");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5001;

// execute database connection
dbConnect();
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", (request, response) => {
  response.json({ message: "You are authorized to access me" });
});

app.post("/login", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  User.findOne({ email: email })
    .then((foundUser) => {
      bcrypt.compare(password, foundUser.password, (err, res) => {
        if (err) {
          response.status(404).send({
            message: "Error",
            err,
          });
        }
        if (!res) {
          response.status(400).send({
            message: "Wrong Password",
          });
        } else {
          const token = jwt.sign(
            {
              userId: foundUser._id,
              userEmail: foundUser.email,
            },
            process.env.TOKEN,
          {expiresIn: "24h"}
          );

          response.status(201).send({
          message: "Login Succesful!",
          email: foundUser.email,
          token,
          });
        }
      });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

// register endpoint
app.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        fName: request.body.fName,
        lName: request.body.lName,
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

app.get("/get-posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error fetching posts",
      error,
    });
  }
});

app.post("/create-post", (req,res) =>{
  const post = new Post({
    fName: req.body.fName,
    lName: req.body.lName,
    mainText: req.body.mainText,
    datePosted: Date()
  });

  post
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          res.status(201).send({
            message: "Post Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          res.status(500).send({
            message: "Error creating post",
            error,
          });
        });
});
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
