function getMaxProfit(array) {
	if (arguments.length === 0 || !Array.isArray(array))
		throw new Error("Expecting to receive an array as argument");

	if (array.length < 2) 
		throw new Error('Getting a profit requires at least 2 prices');
	
	var maxProfit = array[1] - array[0];
	var minPrice = Math.min(array[0], array[1]);
	for (var i = 2; i < array.length; i++) {
		maxProfit = Math.max(maxProfit, array[i] - minPrice);
		minPrice = Math.min(minPrice, array[i]);
	}

	return maxProfit;
}

//var prices = [10, 7, 5, 8, 11, 9];
var prices = [10, 9, 4, 2, 1];
console.log(getMaxProfit(prices));