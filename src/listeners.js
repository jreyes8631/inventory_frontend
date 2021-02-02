document.addEventListener("click", function(e){
  console.dir(e.target);
  let target = e.target
  if(target.matches("categories-Select"))
  console.log("selected category Id", category);
  
  
})


document.addEventListener('DOMContentLoaded', function(e){
 Category.all().then(() => Item.all());
 
});

document.addEventListener('submit', function(e){
    let target = e.target;
    if(target.matches('#newItem')){
     e.preventDefault();
     let formData = {}
     
     target.querySelectorAll('input').forEach(function(input){
       formData[input.name] = input.value;
     })
     
      target.querySelectorAll('select').forEach(function(select){
       formData[select.name] = select.value;
       debugger
     })
     Item.create(formData);
     target.reset();
    
    }
})

document.addEventListener('change', function(e){
  let target = e.target;
  if( target.matches('select')){
    let categoryId = target.value;
    Item.loadByCategory(categoryId)
  }
});