const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Dashbord = require ('../models/dashbord.model');
const Task = require ('../models/task.model');


const router = express.Router();

router.use(authMiddleware);

router.get('/dashbord/all', async (req, res)=>{
    
    try{
        const dashbords = await Dashbord.find().populate("user");
        //console.log(dashbords);  
        return res.send({ dashbords });
          

  } catch (err){
    console.log(err)
      return res.status(400).send({ error: 'Dados não encontrado'});
  };
});

router.get('/dashbord/user/:id', async (req, res) => {
    try{
        const dashbord = await Dashbord.findById(req.params.id).populate("user");
        //console.log(dashbord);  
        return res.send({ dashbord });
          

  } catch (err){
    //console.log(err)
      return res.status(400).send({ error: 'Dado não encontrado'});
  };
});



router.post('/dashbord', async (req, res) => {
    try{
        const { title , description, tasks } = req.body;

        const dashbord = await Dashbord.create({ title, description, user: res.userId });

        await Promise.all(tasks.map( async task => {
            const dashbordTask = new Task({ ...task, dashbord: dashbord._id });
            await dashbordTask.save();
            dashbord.tasks.push(dashbordTask);           
        }));

        await dashbord.save();

        return res.send({ dashbord });      

    } catch (err){
        //console.log(err)
        return res.status(400).send({ error: 'Error ao Criar'});
        

    };
});

router.put('/dashbord/:id', async (req, res) => {
    try{
        const { title , description, tasks } = req.body;

        const dashbord = await Dashbord.findByIdAndUpdate(req.params.id,{
            title, description
        },{ new: true });
        dashbord.tasks = [];
        await Task.removeAllListeners({dashbord: dashbord._id});

        await Promise.all(tasks.map( async task => {
            const dashbordTask = new Task({ ...task, dashbord: dashbord._id });
            await dashbordTask.save();
            dashbord.tasks.push(dashbordTask);           
        }));

        await dashbord.save();

        return res.send({ dashbord });      

    } catch (err){
        //console.log(err)
        return res.status(400).send({ error: 'Error ao Criar'});
        

    };
});


router.delete('/dashbord/:id', async (req, res) => {
    try{
        await Dashbord.findOneAndDelete(req.params.id);
        return res.status(200).send({ menssage: 'Dados apagado com sucesso!!'});    

  } catch (err){
      return res.status(400).send({ error: 'Dado não deletado'});
  };
});


module.exports = app => app.use('/api', router);