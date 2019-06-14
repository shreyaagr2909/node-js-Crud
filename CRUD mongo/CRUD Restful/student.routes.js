module.exports = (app) => {

    const students = require('./student.controller.js');
   
    app.post('/students', students.create);
  
    app.get('/students', students.findAll);
    
    app.get('/students/:id', students.findOne);
   
    app.put('/students/:id', students.update);
  
  app.delete('/students/:id', students.delete);

}