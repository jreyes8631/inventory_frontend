class Item {
  constructor(attributes) {
    let whitelist = ["id", "name", "quantity","color", "details"]
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }

    static container(){
      return this.c ||= document.querySelector("#recipients")
    }
   

    static all(){
      return fetch("http://localhost:3000/items", {
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
      .then(itemArray => {
        this.iCollection = itemArray.map(attrs => new Item(attrs))
        let itemList = this.iCollection.map(item => item.render())
        this.container().append(...itemList)
        return this.iCollection
      })
    }

  
  render() {
   this.element ||= document.createElement('table');
   this.element.class = "container-table";

   this.element ||= document.createElement('thead');
   this.element.class = "container-thead";

   this.element ||= document.createElement('tr');
   this.element.class = "container-tr";

   this.nameLink  ||= document.createElement('th');
   this.nameLink.class = "container-item";
   this.nameLink.textContent = this.name;

   this.quantityLink  ||= document.createElement('th');
   this.quantityLink.class = "container-item2";
   this.quantityLink.textContent = this.quantity;
   
   this.colorLink  ||= document.createElement('th');
   this.colorLink.class = "container-item3";
   this.colorLink.textContent = this.color;

   this.detailsLink  ||= document.createElement('th');
   this.detailsLink.class = "container-item4";
   this.detailsLink.textContent = this.details;

   this.element.append(this.nameLink, this.quantityLink, this.colorLink, this.detailsLink );

   return this.element;

  }


}