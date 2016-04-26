// http://cslibrary.stanford.edu/105/LinkedListProblems.pdf
function SNode(value, next) {
	if (!arguments.length || value === null)
		throw new Error('Expecting a value to be passed');

	this.value = value;
	this.next = next ? next : null;
}

function SLinkedList() {
	this.head = this.tail = null;
	this.length = 0;
}

SLinkedList.prototype = {
	constructor: SLinkedList,
	
	add: function(val) {
		this.addLast(val);
	},

	addLast: function(val) {
		var n = new SNode(val);
		if (!this.length) {
			this.head = this.tail = n;
		} else {
			var curr = this.head;
			while (curr !== this.tail) {
				curr = curr.next;
			}
			curr.next = this.tail = n;
		}
		this.length++;
	}, 

	addFirst: function(val) {
		var n = new SNode(val);
		if (!this.length) {
			this.head = this.tail = n;
		} else {
			n.next = this.head;
			this.head = n;
		}
		this.length++;
	},

	removeFirst: function() {
		if (!this.length)
			throw new Error('List is Empty');
		var n = this.head.next;
		delete this.head;
		this.head = n;
		this.length--;
	},

	pop: function() {
		if (!this.length)
			throw new Error('List is Empty');

		var ret = this.head.value;
		this.removeFirst();
		return ret;
	},

	removeLast: function() {
		if (!this.length)
			throw new Error('List is Empty');

		var curr = this.head;
		while (curr.next !== this.tail)
			curr = curr.next;
		curr.next = null;
		this.tail = curr;
		this.length--;
	},

	toString: function() {
		if (!this.length) {
			console.log('[ ]');
		} else {
			var s = '[ ';
			var curr = this.head;
			while (curr !== null) {
				s += curr.value + ' ';
				curr = curr.next;
			}				
			s += ']';
			console.log(s);
		}
	},

	countValue: function(val) {
		var count = 0;
		if (this.length) {
			var curr = this.head;
			while (curr !== null) {
				if (curr.value === val) count++;
				curr = curr.next;
			}
		}
		return count;
	},

	getNth: function(index) {
		if (!this.length || index > this.length || index < 0)
			throw new Error('Incorrect index specified');

		var counter = 0;
		var curr = this.head;
		while (counter !== index) {
			curr = curr.next;
			counter++;
		}
		return curr.value;
	},

	insertNth: function(index, value) {
		if (index > this.length || index < 0)
			throw new Error('Invalid Index');

		var counter = 0;
		var curr = this.head;
		if (index === 0) {
			this.prepend(value);
		} else {
			while (counter++ !== (index - 1))
				curr = curr.next;

			var w = curr.next;
			var node = new SNode(value);
			node.next = w;
			curr.next = node;
		}
		this.length++;
	},

	sortedInsert: function(value) {
		if (!value || value < this.head.value) 
			return;
		if (this.length === 1) {
			if (value < this.head) 
				this.prepend(value);
			else
				this.append(value);
		}

		var curr = this.head;
		while (curr !== this.tail) {
			if (value > curr.value && value < curr.next.value) {
				var next = curr.next;
				var node = new SNode(value);
				curr.next = node;
				node.next = next;
			}
			curr = curr.next;
		}
		this.length++;
	},

	append: function(list) {
		if (!this.length)
			throw new Error('Empty list attempting to append another list');
		var curr = this.head;
		var counter = 0;
		this.tail.next = list.head;
		while (curr.next !== null)
			curr = curr.next;
		this.tail = curr;

		list.head = this.tail = null;
		this.length = this.length + list.length;
	},

	frontBackSplit: function() {
		if (!this.length)
			throw new Error('List should have a length of at least 2');

		var a = new SLinkedList();
		var b = new SLinkedList();
		var a_counter = 0;
		var curr = list.head;

		while (a_counter++ < Math.floor(this.length / 2)) {
			a.add(curr.value);
			curr = curr.next;
		}

		while (curr !== null) {
			b.add(curr.value);
			curr = curr.next;
		}
		return [a, b];
	},

	removeDuplicates: function() {
		if (this.length < 2)
			throw new Error('Array needs to have a length of 2 minimum');

		var hash = {};
		var prev = null;
		var curr = this.head;

		while (curr !== null) {
			if (!hash[curr.value])
				hash[curr.value] = curr.value;
			else {
				var next = curr.next;	
				prev.next = next;
				this.length--;
			}
			prev = curr;
			curr = curr.next;
		}
	},

	moveNode: function(list) {
		if (list.constructor !== this.constructor)
			throw new Error('Arguments has to be a LinkedList');
		
		if (!list.length)
			return;

		var ret = list.pop();
		this.addFirst(ret);
	},

	shuffleMerge: function(list) {
		if (list.constructor !== this.constructor)
			throw new Error('Arguments needs to be a LinkedList');
		
		if (!list.length)
			return this;

		var newList = new SLinkedList(),
			currA = this.head,
			currB = list.head,
			len = (this.length <= list.length) ? list.length : this.length, 
			i = 0; 

		while (i < len) {
			if (currA) {
				newList.add(currA.value);
				currA = currA.next;
			}

			if (currB) {
				newList.add(currB.value);
				currB = currB.next;
			}
			i++;
		}

		return newList;
	},

	unique1: function(list) {
		if (list.constructor !== this.constructor)
			throw new Error('Expecting a LinkedList as an argument');

		var currA = this.head;
		var hash = {};
		var n = new SLinkedList();
		while (currA !== null) {
			if (!hash[currA.value]) {
				hash[currA.value] = currA.value;
				n.add(currA.value);
			}
			currA = currA.next;
		}

		var currB = list.head;
		while (currB !== null) {
			if (!hash[currB.value]) {
				hash[currB.value] = currB.value;
				n.add(currB.value);
			}
			currB = currB.next;
		}

		return n;
	},

	/*mergeSort: function() {
		function slice(list, start, end) {
			//if (list.constructor !== SLinkedList)
				//throw new Error('Expecting a linked list');

			var nlist = new SLinkedList(),
				counter = 0,
				curr = list.head;

			if (start > list.length || start < 0)
				return;

			if (counter !== start) { // we are not splitting from the beginning
				while (counter < start) {
					curr = curr.next;
					counter++;
				}
			}
			
			if (typeof(end) === 'undefined' || end > list.length) {
				while (curr !== null) {
					nlist.add(curr.value);
					curr = curr.next;
				}
			} else {
				while (counter++ < (end)) {
					nlist.add(curr.value);
					curr = curr.next;
				}
			}

			return nlist;
		}

		function merge(a, b) {
			var n = new SLinkedList(),
				curr_a = a.head,
				curr_b = b.head,
				ia     = 0,
				ib     = 0;

			while (ia < a.length && ib < b.length) {
				if (curr_a.value < curr_b.value) {
					n.add(curr_a.value);
					curr_a = curr_a.next;
					ia++;
				} else {
					n.add(curr_b.value);
					curr_b = curr_b.next;
					ib++;
				}
			}
			n.add( curr_a ? curr_a.value : curr_b.value);
			return n;
		}

		//recursive step
		if (this.length > 1) {
			var mid = this.length >> 1,
				left = this.mergeSort(slice(this, 0, mid)),
				right = this.mergeSort(slice(this, mid));

			return merge(left, right);
		}

		return this;
	}*/
};

var mergeSort = function(linkedList) {
	function slice(list, start, end) {
		var nlist = new SLinkedList(),
			counter = 0,
			curr = list.head;

		if (start > list.length || start < 0)
			return;

		if (counter !== start) { // we are not splitting from the beginning
			while (counter < start) {
				curr = curr.next;
				counter++;
			}
		}
		
		if (typeof(end) === 'undefined' || end > list.length) {
			while (curr !== null) {
				nlist.add(curr.value);
				curr = curr.next;
			}
		} else {
			while (counter++ < (end)) {
				nlist.add(curr.value);
				curr = curr.next;
			}
		}

		return nlist;
	}

	function merge(a, b) {
		var n = new SLinkedList(),
			curr_a = a.head,
			curr_b = b.head,
			ia     = 0,
			ib     = 0;

		while (ia < a.length && ib < b.length) {
			if (curr_a.value < curr_b.value) {
				n.add(curr_a.value);
				curr_a = curr_a.next;
				ia++;
			} else {
				n.add(curr_b.value);
				curr_b = curr_b.next;
				ib++;
			}
		}
		n.add( curr_a ? curr_a.value : curr_b.value);
		return n;
	}

	//recursive step
	if (linkedList.length > 1) {
		var mid = linkedList.length >> 1,
			left = mergeSort(slice(linkedList, 0, mid)),
			right = mergeSort(slice(linkedList, mid));

		return merge(left, right);
	}

	return linkedList;
};

var lista = new SLinkedList();
var listb = new SLinkedList();

lista.add(1);
lista.add(3);
lista.add(5);
listb.add(2);
listb.add(4);
listb.add(6);
var nlist = lista.shuffleMerge(listb);
console.log('n list: ');
nlist.toString();

var list = new SLinkedList();
list.add('a');
list.add('b');
list.add('c');
list.addFirst('z');
list.addFirst('x');
list.add('a');
list.add('j');
list.toString();
//list.removeLast();
//list.toString();
//list.removeFirst();
//list.toString();

var a = new SLinkedList();
var b = new SLinkedList();
a.add(3);
a.add(4);
a.add(5);

b.add(0);
b.add(1);
b.add(2);

a.moveNode(b);
a.toString();
b.toString();

console.log(list.countValue('a'));
console.log(list.getNth(3));

var sortedList = new SLinkedList();
sortedList.add(0);
sortedList.add(2);
sortedList.add(5);
sortedList.add(9);
sortedList.add(11);
sortedList.add(15);

sortedList.toString();
sortedList.sortedInsert(10);
sortedList.toString();

list.append(sortedList);
list.toString();
console.log('remove duplicate');
list.removeDuplicates();
list.toString();
sortedList.toString();

var lists = list.frontBackSplit();
lists[0].toString();
lists[1].toString();

var unsortedList = new SLinkedList();
unsortedList.add(10);
unsortedList.add(1);
unsortedList.add(4);
unsortedList.add(3);
unsortedList.add(9);
unsortedList.add(2);
unsortedList.add(6);
unsortedList.add(7);
unsortedList.add(5);
unsortedList.add(8);

var nn = mergeSort(unsortedList);
//var nn = unsortedList.mergeSort();
console.log('unsorted list now sorted:');
nn.toString();

var d1 = new SLinkedList();
d1.add('a');
d1.add('b');
d1.add('b');
d1.add('a');
var d2 = new SLinkedList();
d2.add('x');
d2.add('y');
d2.add('z');
d2.add('y');
//var nn = d1.unique2(d2);
//nn.toString();