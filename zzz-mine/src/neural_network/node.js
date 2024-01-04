var activationsNames = ["Sigmoid", "Identity", "Step", "Tanh", "ReLu"]; //Used in the svg drawing

//The Node Class
//This is where math appends
class Node {
	constructor(num, lay, isOutput) {
		this.number = num;
		this.layer = lay;
		this.activationFunction = Math.floor(Math.random() * 5); //Number between 0 and 4
		this.bias = Math.random() * 2 - 1;
		this.output = isOutput || false; //is this node an Output node?

		this.inputSum = 0;
		this.outputValue = 0;
		this.outputConnections = [];
	}

	engage() { //Pass down the network the calculated output value
		if (this.layer != 0) //No activation function on input nodes
			this.outputValue = this.activation(this.inputSum + this.bias);


		this.outputConnections.forEach((conn) => {
			if (conn.enabled) //Do not pass value if connection is disabled
				conn.toNode.inputSum += conn.weight * this.outputValue; //Weighted output sum
		});
	}

	randomGaussian(mean = 0, stdev = 1) {
		const u = 1 - Math.random(); // Converting [0,1) to (0,1]
		const v = Math.random();
		const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
		// Transform to the desired mean and standard deviation:
		return z * stdev + mean;
	}

	mutateBias() { //Randomly mutate the bias of this node
		let rand = Math.random();
		if (rand < 0.05) //5% chance of being assigned a new random value
			this.bias = Math.random() * 2 - 1;
		else //95% chance of being uniformly perturbed
			this.bias += this.randomGaussian() / 50;
	}

	mutateActivation() { //Randomly choose a new activationFunction
		this.activationFunction = Math.floor(Math.random() * 5); //Number between 0 and 4
	}

	isConnectedTo(node) { //Check if two nodes are connected
		if (node.layer == this.layer) //nodes in the same layer cannot be connected
			return false;


		if (node.layer < this.layer) { //Check parameter node connections
			node.outputConnections.forEach((conn) => {
				if (conn.toNode == this) //Is Node connected to This?
					return true;
			});
		} else { //Check this node connections
			this.outputConnections.forEach((conn) => {
				if (conn.toNode == node) //Is This connected to Node?
					return true;
			});
		}

		return false;
	}

	clone() { //Returns a copy of this node
		let node = new Node(this.number, this.layer, this.output);
		node.bias = this.bias; //Same bias
		node.activationFunction = this.activationFunction; //Same activationFunction
		return node;
	}

	activation(x) { //All the possible activation Functions
		return x < 0 ? 0 : x;
	}
}