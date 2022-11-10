const Expense=require('../model/databaseTable')

//ADD expense
const addExpense= async(req,res,next)=>{
    const amount=req.body.amount;
    const category=req.body.category;
    const description=req.body.description;

    const data= await Expense.create({amount:amount,category:category,description:description});
    res.status(201).json({newExpenseDetail:data});



};
//GET Expense
const getExpense=async(req,res,next)=>{

    const expenses= await Expense.findAll();
    res.status(200).json({allExpenses:expenses});

}
//Delete Expense

const deleteExpense=async(req,res)=>{
    console.log("113");
    try {
        //console.log("123"+req.params.id);
        if(req.params.id=='undefined'){
            console.log('ID is missing');
            return res.status(404).json({err:'id is missing'})
        }
        const eId=req.params.id;
        await Expense.destroy({where:{id:eId}});
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const editExpense= async(req,res)=>{

    const eId=req.params.id;
    const amount=req.body.amount;
    const category=req.body.category;
    const description=req.body.description;
    console.log("abc123---"+eId);
    //{amount:amount,category:category,description:description},
    const data= await Expense.update({amount:amount,category:category,description:description},{where:{id:1}});
    console.log("abc---"+data);
    
    res.status(204).json({editExpenseDetail:data});
}

module.exports={
    addExpense,
    getExpense,
    deleteExpense,
    editExpense
}