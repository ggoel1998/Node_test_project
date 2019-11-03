const express = require('express')
const route = express.Router()

const tasks =[ {name:'First task',done: true } ]

route.get('/', (req, res) => {
  res.status(200).send(tasks)
})

route.post('/', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      status: 'error',
      message: 'Task name not provided'
    })
  }
  tasks.push({
    name: req.body.name,
    done: false,
 });

  res.status(201).send({
    status: 'success',
    todoId: tasks.length - 1,
  })

})

// route.patch('/:id',(req,res)=>{
//   if(tasks[req.param.id]){
//   tasks[req.params.id].done=!tasks[req.params.index].done;
//   }
//   res.status(404).send({
//     status: 'error',
//     message: 'No such todo found'
//   })
// }) 

// route.get('/:id', (req, res) => {
//   if (tasks[req.params.id]) {
//     res.status(200).send(tasks[req.params.id])
//   } else {
//     res.status(404).send({
//       status: 'error',
//       message: 'No such todo found'
//     })
//   }
// })
route.get('/delete/:id', (req, res) => {
  if (tasks[req.params.id]) {
    tasks.splice(id,1)
    res.status(200).send({
      status: 'Deleted'
    })
  } else {
    res.status(404).send({
      status: 'error',
      message: 'No such todo found'
    })
  }
})

module.exports = route