const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

const User = require('../models/user.model');

const router = express.Router();

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
 });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;
  
  try{
    if(await User.findOne({ email }))
    return res.status(400).send({ error: 'O usuario com esse e-mail ja existe!'});
    
    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({  user, token: generateToken({ id: user.id}) });
  } catch(err){
    console.log(err)
    return res.status(400).send({ error: 'Ocorreu algum erro ao criar o Usuário'});
  }
});

router.post('/authenticate', async (req, res) =>{
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  //return res.status(200).send({massage : 'logado com susseco!'})
  
  if (!user)
  return res.status(400).send({ error: 'Usuario nao encontrado' });
  
  if(!await bcrypt.compare(password, user.password))
  return res.status(400).send({ error: 'Dados Incorretos'});

  user.password = undefined;  

  res.send({ user, token: generateToken({ id: user.id}) });
  console.log(user);
});

module.exports = app => app.use('/api', router);