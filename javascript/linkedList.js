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
		var b_counter = 0;
		var curr = list.head;

		while (a_counter++ < Math.floor(this.length / 2)) {
			a.addLast(curr.value);
			curr = curr.next;
		}

		while (curr !== null) {
			b.addLast(curr.value);
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
	}
};

var list = new SLinkedList();
list.addLast('a');
list.addLast('b');
list.addLast('c');
list.addFirst('z');
list.addFirst('x');
list.addLast('a');
list.addLast('j');
list.toString();
//list.removeLast();
//list.toString();
//list.removeFirst();
//list.toString();

var a = new SLinkedList();
var b = new SLinkedList();
a.addLast(3);
a.addLast(4);
a.addLast(5);

b.addLast(0);
b.addLast(1);
b.addLast(2);

a.moveNode(b);
a.toString();
b.toString();

console.log(list.countValue('a'));
console.log(list.getNth(3));

var sortedList = new SLinkedList();
sortedList.addLast(0);
sortedList.addLast(2);
sortedList.addLast(5);
sortedList.addLast(9);
sortedList.addLast(11);
sortedList.addLast(15);

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