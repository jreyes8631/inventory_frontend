document.addEventListener("click", function(e){
  console.dir(e.target);
  
})


// document.addEventListener('DOMContentLoaded', function(e){
 Category.all().then(() => Item.all());
 
// });

document.addEventListener('submit', function(e){
    let target = e.target;
    if(target.matches('#newItem')){
     e.preventDefault();
     let formData = {}
     
     target.querySelectorAll('input').forEach(function(input){
       formData[input.name] = input.value;
     })
     Item.create(formData);
     target.reset();
    
    }
})

document.addEventListener('change', function(e){
  let target = e.target;
  if( target.matches('select')){
    let categoryId = target.value;
    document.getElementById("category_id").value = categoryId;
    Item.loadByCategory(categoryId)
  }
  
});

document.addEventListener('click', function(e){
  let target = e.target;
  if(target.matches('#Sort-by-name')){
    Item.sortByname();
   
  }
  
})

