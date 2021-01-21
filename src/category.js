class Category {
  constructor(attributes) {
    let whitelist = ["id", "title", "description", "user_id"]
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }

    static container(){
      return this.c ||= document.querySelector("#categories-list")
    }
   

    static all(){
      return fetch("http://localhost:3000/categories", {
        headers:{
         "Accept": "application/json",
         "Content-Type": "application/json"
        }
      })
      .then(res => {
        if(res.ok){
          return res.json()
        } else{
          return res.text().then(error => Promise.reject(error))
        }
      })
      .then(categoryArray => {
        this.collection = categoryArray.map(attrs => new Category(attrs))
        let categoryList = this.collection.map(c => c.render())
        this.container().append(...categoryList)
        return this.collection
      })
    }

  
  render() {
 
  this.element ||= document.createElement('select');
   this.element.class = "container";

   this.nameOp  ||= document.createElement('option');
   this.nameOp.class = "container-category";
   this.nameOp.textContent = `Category: ${this.title}`;

   this.element.append(this.nameOp);

   return this.element;
  }


}