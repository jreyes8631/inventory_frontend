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
   this.element ||= document.createElement('li');
   this.element.class = "container";

   this.nameLink  ||= document.createElement('a');
   this.nameLink.class = "container-category";
   this.nameLink.textContent = `Category: ${this.title}`;

   this.editLink ||= document.createElement('a');
   this.editLink.classList.add(..."py-4 text-right".split(" "))
   this.editLink.innerHTML = `<i class="fa fa-pencil-alt"></i>`;

   this.deleteLink ||= document.createElement('a');
   this.deleteLink.classList.add(..."my-4 text-right".split(" "))
   this.editLink.innerHTML = `<i class="fa fa-trash-alt"></i>`;

   this.element.append(this.nameLink, this.editLink, this.deleteLink);

   return this.element;
  }


}