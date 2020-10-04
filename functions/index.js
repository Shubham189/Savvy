const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app=require('express')();

admin.initializeApp();
const firebaseConfig = {
  apiKey: "AIzaSyDV-dbMPNsn9rXNFJMqQYYEZzUhLTvlklw",
  authDomain: "savvy-b93da.firebaseapp.com",
  databaseURL: "https://savvy-b93da.firebaseio.com",
  projectId: "savvy-b93da",
  storageBucket: "savvy-b93da.appspot.com",
  messagingSenderId: "316132456206",
  appId: "1:316132456206:web:42ac2b1b5f070cc7d4095f",
  measurementId: "G-6J9XJK4L6C"
};

const firebase=require('firebase');
firebase. initializeApp(firebaseConfig);



app.get('/questions', (req,res)=>{
  admin
    .firestore()
    .collection('questions')
    .orderBy('questionedAt', 'desc') 
    .get()
    .then((data) =>{
      let questions = [];
      data.forEach(doc =>{
        questions.push({
          screamId: doc.id,
          ...doc.data()
        });
      });
      return res.json(questions);
    })
    .catch(err => console.error(err));
});

app.post('/question', (req, res) => {

  const newQuestion = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    questionedAt: new Date().toISOString()
  };

  admin
    .firestore()
    .collection('questions')
    .add(newQuestion)
    .then((doc) =>{
      res.json({message: `document ${doc.id} created successfully!`});
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong'});
      console.error(err);
    });
}); 

//signup route
app.post('/signup', (res,req)=>{
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }
})


//add '/api'
exports.api= functions.region('asia-south1').https.onRequest(app);