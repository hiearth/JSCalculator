
if (typeof calculator == "undefined") {
    calculator = function() { }
}

calculator.standardMode = function() {
    this.leftOperand = null;
    this.rightOperand = null;
    this.result = null;
    this.currentInput = null;
    this.expression = null;
}

calculator.standardMode.prototype.plus = function(op1, op2) {
    return calculator.operator.plus(op1, op2);
}

calculator.standardMode.prototype.minus = function(op1, op2) {
    return calculator.operator(op1, op2);
}

calculator.standardMode.prototype.multiply = function(op1, op2) {
    return calculator.operator.multiply(op1, op2);
}

calculator.standardMode.prototype.divide = function(op1, op2) {
    return calculator.operator.divide(op1, op2);
}

calculator.standardMode.prototype.percent = function(op) {
    return calculator.operator.percent(op);
}

calculator.standardMode.prototype.squareRoot = function(op) {
    return calculator.operator.squreRoot(op);
}

calculator.standardMode.prototype.clean = function() {
    this.leftOperand = null;
    this.rightOperand = null;
    this.result = null;
}

calculator.standardMode.prototype.backspace = function() {
    
}

calculator.standardMode.prototype.compute = function() {
    return this.result;
}