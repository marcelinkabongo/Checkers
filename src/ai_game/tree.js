class myTree {
    constructor(initialValue) {
        this.value = initialValue;
        this.branches = [];
        this.nbBranches = 0;
    }

    addBranch(newTree) {
        this.branches.push(newTree)
        this.nbBranches++;
    }
}