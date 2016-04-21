function SNode(value, next) {
	if (!arguments.length) 
		return;
	this.value = value ? value : null;
	this.next = next ? next : null;
}

function SLinkedList() {
	this.head = this.tail = null;
	this.length = 0;
}

SLinkedList.prototype = {
	constructor: SLinkedList,
	
	append: function(val) {
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

	prepend: function(val) {
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
		var curr = this.head;
		if (!this.length)
			return count;
		while (curr !== null) {
			if (curr.value === val) count++;
			curr = curr.next;
		}
		return count;
	},

	getNth: function(v) {
		var counter = 0;
		var curr = this.head;
		while (counter !== v) {
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
			node.next = w
			curr.next = node;
		}
		this.length++;
	},

	sortedInsert: function(value) {
		if (!value || value < this.head.value) 
			return;

		var curr = this.head;
		while (curr !== this.tail) {
			if (value > curr.value && value < curr.next) {
				var next = curr.next;
				var node = new SNode(value);
				curr.next = node;
				node.next = next;
				this.length++;
			}
			curr = curr.next;
		}
	}
};

var list = new SLinkedList();
list.append('a');
list.append('b');
list.append('c');
list.prepend('z');
list.prepend('x')
list.append('a');
list.append('j');
list.toString();
//list.removeLast();
//list.toString();
//list.removeFirst();
//list.toString();

console.log(list.countValue('a'));
console.log(list.getNth(3));