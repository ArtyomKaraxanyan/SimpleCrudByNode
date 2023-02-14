const Joi= require('joi');  
const express=require('express');
const { abort } = require('process');
const { join } = require('path');
const app= express();
app.use(express.json());

const users=[
    {id:1,name:'Some1'},
    {id:2,name:'Some2'},
    {id:3,name:'Some3'},

]   

function inputValidation(request,response){
    const schema = Joi.object({ name: Joi.string() .min(6) .max(10) .required(),
    });
    const validation = schema.validate(request); 
      console.log(validation);      


if(validation.error)
{
    response.status(400).send(validation.error.details[0].message);
return;
}
}

app.get('/',(req,res)=>{

    res.send("CRUD Users")
});
app.get('/users',(req,res)=>{
    res.send((users));
})


app.post('/add-new-user',(req,res)=>{

    inputValidation(req.body,res)

const user={
id:users.length + 1,
name:req.body.name
}

users.push(user);
res.send(user);

});

app.get('/user/:id',(req,res)=>{

    let user= users.find( u=>u.id === parseInt(req.params.id) )
    if(!user) res.status(404).send('ID not found')
    res.send(user.name)
})


app.put('/update/user/:id',(req,res)=>{

let user=users.find(u=>u.id===parseInt(req.params.id))

if(user){

inputValidation(req.body,res)

user.name=req.body.name
res.send(user);

}else{
    
req.status(404).send('404 No any user by that id')
}

});

app.delete('/delete/user/:id',(req,res)=>{
    let user=users.find(u=>u.id===parseInt(req.params.id))
    
if(user){

    const index=users.indexOf(user)
    users.splice(index,1);
    res.send(users);
}else{
    res.status(404).send('404 No any user by that id')
}

})


const port= process.env.PORT || 3000 ;

app.listen(port,console.log(`LIsten port ${port}`));    