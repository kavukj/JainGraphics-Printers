module.exports = function cart(oldCart){
	this.items = oldCart.items || {};
	this.TotalQty = oldCart.TotalQty || 0;
	this.TotalPrice = oldCart.TotalPrice || 0; 
	
	this.add = function(item,id){
		var storedItem = this.items[id];
		if(!storedItem){
			storedItem = this.items[id] = {item:item, qty:0, price :0};
		}
		storedItem.qty++;
		storedItem.price=storedItem.item.price*storedItem.qty;
		this.TotalPrice+=storedItem.item.price;
		this.TotalQty++;
	};
	
	this.remove = function(item,id){
		var q= this.items[id].qty;
		var p= q*this.items[id].price;
		this.TotalQty= this.TotalQty-q;
		this.TotalPrice=this.TotalPrice-p;
		delete this.items[id];
	};

	
	this.generateArray = function(){
		var arr =[];
		for(var id in this.items){
			arr.push(this.items[id]);
		}
		return arr;
	};
};
