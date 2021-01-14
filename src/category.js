
class Category {
    constructor(attributes) {
        let whitelist = ["id","title", "description", "user_id"]
        whitelist.forEach(attr => this[attr] = attributes[attr])
    }

    static container(){
        return this.c ||= document.querySelector("#inventoryContainer")
    }
}