const express = require('express')
const router = express.Router()
const authUser = require('../user/auth')
const { projects , users,ROLE} = require('../data')


router.get('/', (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    res.status(403).send('You need to sign In...');
  } else {
    res.json(projects);
  }
});


router.get('/:projectId',  (req, res) => {

      const userId = req.body.userId;
      if(!userId) res.status(403).send('You need to sign In...')
      
     const projectId = parseInt(req.params.projectId);
     const user_role = users.find(obj1 => obj1.id === userId)
     const find_project = projects.find(obj => projectId===obj.id)
     if(find_project.length===null) res.status(404).send('Not Found')
     else 
    {
      if(user_role.role === ROLE.ADMIN || projectId === userId) res.send(find_project)
        else res.send('You Don\'t have Permission')
    }
})


router.delete('/del/:projectId', (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(403).send('You need to Sign In');
  }

  const projectId = parseInt(req.params.projectId);
  const projectIndex = projects.findIndex(obj => obj.id === projectId);
  const user = users.find(obj => obj.id === userId);

  if (projectIndex === -1) {
    return res.status(404).send('Not Found');
  }

  if (!user) {
    return res.status(403).send('User not found');
  }

  if (user.role === ROLE.ADMIN || projects[projectIndex].userId === userId) {
    projects.splice(projectIndex, 1);  // Remove the project from the array
    return res.send('Deleted Successfully');
  } else {
    return res.status(403).send('You Don\'t have Permission');
  }
});


module.exports = router