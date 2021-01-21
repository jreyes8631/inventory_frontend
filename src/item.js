class Item {
  constructor(attributes) {
    let whitelist = ["id", "name", "quantity","color", "details", "category_id"]
    whitelist.forEach(attr => this[attr] = attributes[attr])
  }

    static container(){
      return this.c ||= document.querySelector("#itemsTable")
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
    
    static findById(id) {
     return this.collection.find(item => item.id == id);
    }

    static create(formData) {
    return fetch("http://localhost:3000/items", {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({item: formData})
    })
      .then(res => {
        if(res.ok) {
          return res.json() 
        } else {
          return res.text().then(error => Promise.reject(error)) 
        }
      })

      .then(itemAttributes => {
        let itemListed = new Item(itemAttributes);
        this.collection.push(itemListed);
        this.container().appendchild(itemListed.render());
        new FlashMessage({type: 'success', message: 'New item added successfully'})
        return itemListed;
      })

      .catch(error => {
        new FlashMessage({type: 'error', message: error});
        
      })
  }

  
  render() {
   this.element ||= document.createElement('tr');
   this.element.classList.add(..."min-w-full divide-y divide-gray-200".split(" "));

   this.nameTd  ||= document.createElement('td');
   this.nameTd.classList.add(..."px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider".split(" "));
   this.nameTd.textContent = this.name;

   this.quantityTd  ||= document.createElement('td');
   this.quantityTd.classList.add(..."px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider".split(" "));
   this.quantityTd.textContent = this.quantity;
   
   this.colorTd  ||= document.createElement('td');
   this.colorTd.classList.add(..."px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider".split(" "));
   this.colorTd.textContent = this.color;

   this.detailsTd  ||= document.createElement('td');
   this.detailsTd.classList.add(..."px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider".split(" "));
   this.detailsTd.textContent = this.details;

   this.element.append(this.nameTd, this.quantityTd, this.colorTd, this.detailsTd );

   return this.element;

  }


}

class FlashMessage {
  constructor({type, message}){
    this.message = message;
    this.color = type == "error" ? 'bg-red-200' : 'bg-green-100'
  }

  static container(){
    this.c ||= document.querySelector('#flash')
  }

  render(){
    this.container().textContent = this.message;
    this.container().classList.toggle(this.color)
  }
}