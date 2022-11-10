// network call 
let flag=false;
async function saveToCrud(event){
    try {
    if(flag===false){
    event.preventDefault();
    const amount = event.target.amt.value;
    const category = event.target.cat.value;
    const description = event.target.desc.value;

    const obj={
        amount,
        category,
        description
    };
    //console.log(obj);
        let post= await axios.post("http://localhost:4000/expense/add-expense",obj)
        showExpense(post.data.newExpenseDetail);
    } 
    } catch (error) {
        console.log(error);
    }    
}

//
window.addEventListener("DOMContentLoaded", async () => {
  
    try {
        let getData = await axios.get("http://localhost:4000/expense/get-expense")
        for(let i=0;i<getData.data.allExpenses.length;i++){
            showExpense(getData.data.allExpenses[i]);
        }

    } catch (error) {
        console.log(error);
    }
    
    
})

function showExpense(expense){
    document.getElementById('amt').value='';
    document.getElementById('cat').value='';
    document.getElementById('desc').value='';


    const parentNode=document.getElementById('expenseList');
    const childHTML=`<li id=${expense.id}> ${expense.amount} - ${expense.category} - ${expense.description}
                     <button onclick=deleteExpense('${expense.id}')>Delete</button>
                     <button onclick=editExpense('${expense.id}','${expense.amount}','${expense.category}','${expense.description}')>Edit</button>
                     </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}



  async function deleteExpense(eId){
    try {
    let deleteE=await axios.delete(`http://localhost:4000/expense/delete-expense/${eId}`)
        //console.log(deleteE);
        removeExpenseFromScreen(eId)
    } catch (error) {
        console.log(error);
    }

}
function removeExpenseFromScreen(expId){
    const parentNode = document.getElementById('expenseList');
    const childNodeToBeDeleted = document.getElementById(expId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}

//edit expense 
async function editExpense(expID,expAmount,category,description){
const newObj={
    amount: document.getElementById('amt').value=expAmount,
    category:document.getElementById('cat').value=category,
    description :document.getElementById('desc').value=description
 }
 //let update= await axios.put(`https://crudcrud.com/api/869f7f9c0a504b748b949b1f7e169432/expenseTracker/${expID}`,newObj)
 try {
     deleteExpense(expID)
     //console.log(update.data);
 } catch (error) {
     console.log(error);
}
}
//put call using id

// async function editExpense(expID,expAmount,category,description){
//     try {
//         console.log("I am editing");
//         let update= await axios.put(`http://localhost:4000/expense/edit-expense/${expID}`,newObj)
//     const newObj={
//        id:expID,
//        amount:document.getElementById('amt').value=expAmount,
//        category:document.getElementById('cat').value=category,
//        description:document.getElementById('desc').value=description
//     }
    
       
//     } catch (error) {
//         console.log(error);
//     }
// }
