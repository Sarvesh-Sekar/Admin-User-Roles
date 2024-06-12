const express = require('express')
const app = express()
const {ROLE , users } = require('./data')
const authUser = require('./user/auth')
const projectRouter = require('./router/route')

app.use(express.json())


app.use('/projects', projectRouter)

app.get('/', (req, res) => {
  const user = req.body.userId;
  if(!user) res.status(403).send('You need to Sign in')
  else
{
  res.send('Home Page')
}
  
})

app.get('/dashboard',(req, res) => {
  const user = req.body.userId;
  if(!user) res.status(403).send('You need to Sign in')
  else
{
  res.send('Dashboard Page')
}
  
})

app.get('/admin', (req, res) => {
  const userId = req.body.userId;
  const user = users.find(obj => obj.id === userId)
  if(!userId) res.status(403).send('You need to Sign in')
  else
{
   if(user.role === ROLE.ADMIN) return res.send('Admin Page');
   else return  res.send('You are not allowed to Sign In')
  
}
  
})

function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  next()
}


  

app.listen(3000)