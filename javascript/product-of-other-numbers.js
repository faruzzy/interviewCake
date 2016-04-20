function productOfOtherNumbers(array) {
	if (arguments.length === 0 || !Array.isArray(array))
		throw new Error('Expecting an array to be passed as an argument');
	
	if (array.length < 2)
		throw new Error('Array should contain at least two elements');

	var result = [];
	for (var i = 0; i < array.length; i++) {
		var sum = 1;
		for (var j = 0; j < array.length; j++) {
			if (i === j)
				continue;
			sum *= array[j];
		}
		result.push(sum);
	}
	return result;
}

console.log(productOfOtherNumbers([1, 7, 3, 4]));