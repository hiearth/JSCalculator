
if (typeof calculator == "undefined") {
    calculator = function() { }
}

// expressionBuilder

// use one array to store expressoin
// use two array to compute expression
// when compute, first construct expression, then compute.
calculator.expressionBuilder = function() {
    this.expressionFragment = new Array();
    this.currentInput = null;
}

calculator.expressionBuilder.prototype.appendNumber = function(inNumber) {
    this.currentInput = (this.currentInput == null ? "" : this.currentInput) + inNumber.toString();
}

calculator.expressionBuilder.prototype.appendOperator = function(inOperator) {
    this.expressionFragment.push(this.currentInput);
    this.currentInput = null;
    this.expressionFragment.push(inOperator);
    // 4. if existing operands and operators can compute, compute.
}

// the logic of expression construction is complicated, 
// so I should decompose the expresson to simple expressions and then assemble them
calculator.expressionBuilder.getExpression = function() {
    var operands = new Array();
    var operators = new Array();
    for (var index = 0; index < this.expressionFragment.length; index++) {
        var expAtom = this.expressionFragment[index];
        if (this.isOperator(expAtom)) {
            operators.push(expAtom);
        }
        else {
            operands.push(expAtom);
        }
    }
    
    // construct an expression from operands and operators
    // return this expression.
}

calculator.expressionBuilder.isOperator = function(inOperator){
    
}

calculator.expressionBuilder.prototype.createLiteral = function(number) {
    return new calculator.literalExpression(number);
}

calculator.expressionBuilder.prototype.createUnary = function(exp, operator) {
    return new calculator.unaryExpression(exp, operator);
}

calculator.expressionBuilder.prototype.createBinary = function(leftExp, rightExp, operator) {
    return new calculator.binaryExpression(leftExp, rightExp, operator);
}

calculator.expressionBuilder.prototype.createTernary = function(leftExp, middleExp, rightExp, operator) {
    return new calculator.ternaryExpression(leftExp, middleExp, rightExp, operator);
}