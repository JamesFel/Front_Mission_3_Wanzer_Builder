// class definition for basket class.

function Basket(name, cost, weight, bpType, capacity)
{
    Backpack.call(this, name, cost, weight, bpType);
    this.capacity = capacity;
    this.contents = [];  // to store up to capacity number of Items in backpack
}

Basket.prototype = Object.create(Backpack.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.addItem = function(item)
{
    if (this.contents.length < this.capacity)
    {
        this.contents.push(item);
    }
}
Basket.prototype.removeItem = function(item)
{
    if (!Array.prototype.indexOf) // for compatibility with older versions of IE.
    {
        Array.prototype.indexOf = function(elt /*, from*/)
        {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++)
        {
          if (from in this &&
              this[from] === elt)
            return from;
        }
        return -1;
      };
    }
    else
    {
        var index = array.indexOf(5);

        if (index > -1) {this.contents.splice(index, 1);}
    }
}