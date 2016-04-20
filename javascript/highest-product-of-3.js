// brute force O(n^3) .. horibble
function highestProductOf3(arr) {
	if (arguments.length === 0 || !Array.isArray(arr))
		throw new Error('Expecting array to be passed as an argument');

	var max;
	for (var i = 0, len = arr.length; i < len; i++) {
		for (var j = i + 1; j < len; j++) {
			for (var k = j + 1; k < len; k++) {
				var product = arr[i] * arr[j] * arr[k];
				if (!max || product > max)
					max = product;
			}
		}
	}

	return max;
}

// sorting O(nlogn) .. better
function highestProductOf3_2(arr) {
	if (arguments.length === 0 || !Array.isArray(arr))
		throw new Error('Expecting array to be passed as an argument');
	
	arr.sort(function(a, b) {
		return b - a;
	});
	return arr[0] * arr[1] * arr[2];
}

var array = [10, 1, 3, 4, 5, 6, 7, 8, 9, 2];
console.log(highestProductOf3(array));
console.log(highestProductOf3_2(array));