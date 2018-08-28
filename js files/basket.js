// class definition for basket class.

function Basket(name, cost, weight, bpType, capacity)
{
    Backpack.call(this, name, cost, weight, bpType);
    this.capacity = capacity;
    this.contents = []; // to store up to capacity number of Items in backpack
}

Basket.prototype = Object.create(Backpack.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.adjustCost = function(priceList)
{
    let cost = 0;
    for(let i= 0; i < this.capacity; i++)
    {
        if(this.contents[i] != null)
        {
            cost += priceList[this.contents[i]];
        }
    }
    this.cost = cost;
}