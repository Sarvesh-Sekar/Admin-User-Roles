const  authUser=(req, res, next)=>{
  if (!req.user) {
    res.status(403)
    return res.send('You need to sign in')
  }
  next();
}

    module.exports = authUser;