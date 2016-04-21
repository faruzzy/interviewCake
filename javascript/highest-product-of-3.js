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

// O(n) .. way better
function highestProductOf3_3(arr) {
	if (!arguments.length && !Array.isArray(arr))
		throw new Error('Expecting an array to be passed as an argument');
	
	var maxValues = [];
	for (var i = 0, len = arr.length; i < len; i++) {
		if (!maxValues.length || maxValues.length < 3) {
			maxValues.push(arr[i]);
		}
		
		if (maxValues.length && maxValues.length === 3) {
			var m = Math.max.apply(Math, maxValues);
			if (arr[i] > m) {
				var idx = maxValues.indexOf(m);
				maxValues.splice(idx, 1);
			}
		}
	}

	var res = 1;
	for (var j = 0; j < maxValues.length; j++)
		res *= maxValues[j];
	return res;
}

//var array = [10, 1, 3, 4, 5, 6, 7, 8, 9, 2];
var array = [-10, -10, 1, 3, 2];
/*var array = [];
function getRandomArbitrary(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < 1000; i++)
	array.push(getRandomArbitrary(0, 500));
*/
var start = new Date().getTime();
console.log(highestProductOf3(array));
var end = new Date().getTime();
console.log('execution time: ' + (end - start));

start = new Date().getTime();
console.log(highestProductOf3_2(array));
end = new Date().getTime();
console.log('execution time: ' + (end - start));

start = new Date().getTime();
console.log(highestProductOf3_3(array));
end = new Date().getTime();
console.log('execution time: ' + (end - start));