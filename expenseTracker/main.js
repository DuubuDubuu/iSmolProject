const forms = document.querySelector('#forms');
const expenseNames = document.querySelector('#expenseName');
const expenseValues = document.querySelector('#expenseValue');
const userListNames = document.querySelector('#user-list-expense-name');
const userListValues = document.querySelector('#user-list-expense-value');

forms.addEventListener('submit', onSubmit);

function onSubmit(e){
  e.preventDefault();

  if(expenseNames.value === ''){
    console.log('wow');
  }
  else{
    //creation of variable for li, (list)
    const li = document.createElement('li');
    const liValue = document.createElement('li');

    //creation of text node for the list(livalue and li) and appending value to it
    li.appendChild(document.createTextNode(`${expenseNames.value}`))
    liValue.appendChild(document.createTextNode(`${expenseValues.value}`))

   
    //Appends the value of the list created to the Unordered List
    liValue.classList.add('textDeco');
    userListNames.appendChild(li);
    userListValues.appendChild(liValue);

    //Clear forms
    expenseNames.value = '';
    expenseValues.value = '';

  }
}

