var getMaxProfit = function(array) {
	if (arguments.length === 0 || !Array.isArray(array))
		return;

	var maxProfit;
	var start = 0;
	var counter = 0;
	for (var i = start + 1, len = array.length; i < len; i++) {
		if (array[i] < array[i - 1]) {
			if (counter > 0) {
				maxProfit = array[i - 1] - array[start];
				counter = 0;
			}
			start = i;
		} else {
			counter++;
		}
	}
	return (maxProfit) ? maxProfit : "No profit could have been made yesterday";
};

var strockPricesYesterday = [10, 7, 5, 8, 11, 9];
//var strockPricesYesterday = [10, 9, 5, 3, 2, 1];

console.log(getMaxProfit(strockPricesYesterday));