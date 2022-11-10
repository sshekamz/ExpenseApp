const express=require('express');
const route=express();

const expenseController=require('../controller/expense');

//PUT
route.post('/expense/add-expense', expenseController.addExpense);

//GET

route.get('/expense/get-expense', expenseController.getExpense);

//DELETE
route.delete('/expense/delete-expense/:id', expenseController.deleteExpense);

//PUT
route.put('/expense/edit-expense/:id',expenseController.editExpense);

module.exports=route;