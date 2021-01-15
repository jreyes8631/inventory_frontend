const categoryFormFields = `
    <label>Title:</label><br/>
    <input type="text" id="title" required>
    <input type="hidden" id="category_id">
    <label>Description: </label>
    <textarea id="description" rows="3" cols="20" required></textarea>
`;


class Category {
  constructor(attributes) {
    let whitelist = ["id", "title", "description", "user_id"]
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }

    static container(){
      return this.c ||= document.querySelector("#container")
    }
   

    static list(){
      return this.l ||= document.querySelector("#categories-list")
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
      .then(categoryArray =>{
        debugger
      })
    }

  



}