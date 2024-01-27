const mongoose = require('mongoose');




const DashbordSchema = new mongoose.Schema({
  title:{
    type: String,
    require: true,
  },
  description:{
    type: String,
    require: true,
  },
  user:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    require: true,  
  },
  tasks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks',
  }],
    createdAt:{
      type: Date,
      default: Date.now,
    },    
});



const Dashbord = mongoose.model('Dashbord', DashbordSchema);

module.exports = Dashbord;
