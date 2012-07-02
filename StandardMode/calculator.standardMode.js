
if (typeof calculator == "undefined") {
    calculator = function() { }
}

calculator.standardMode = function() {
    this.expression = null;
    this.leftOperand = null;
    this.rightOperand = null;
    this.result = null;
    this.currentInput = null;
    this.currentOperator = null;
}




calculator.standardMode.prototype.plus = function(op1, op2) {
    return calculator.operators.plus(op1, op2);
}

calculator.standardMode.prototype.plus.toString = function() {
    return "+";
}

calculator.standardMode.prototype.minus = function(op1, op2) {
    return calculator.operators.minus(op1, op2);
}

calculator.standardMode.prototype.minus.toString = function() {
    return "-";
}

calculator.standardMode.prototype.multiply = function(op1, op2) {
    return calculator.operators.multiply(op1, op2);
}

calculator.standardMode.prototype.multiply.toString = function() {
    return "*";
}

calculator.standardMode.prototype.divide = function(op1, op2) {
    return calculator.operators.divide(op1, op2);
}

calculator.standardMode.prototype.divide.toString = function() {
    return "/";
}

calculator.standardMode.prototype.percent = function(op) {
    return calculator.operators.percent(op);
}

calculator.standardMode.prototype.percent.toString = function() {
    return "%";
}

calculator.standardMode.prototype.squareRoot = function(op) {
    return calculator.operators.squreRoot(op);
}

calculator.standardMode.prototype.squareRoot.toString = function() {
    return "√";
}

calculator.standardMode.prototype.clean = function() {
    this.leftOperand = null;
    this.rightOperand = null;
    this.result = null;
}

calculator.standardMode.prototype.backspace = function() {

}

calculator.standardMode.prototype.compute = function() {
    this.rightOperand = this.currentInput;
    this.result = this.currentOperator(parseFloat(this.leftOperand), parseFloat(this.rightOperand));
    this.currentInput = null;
    return this.result;
}

calculator.standardMode.prototype.setCurrentOperator = function(inOperator) {
    var previousOp = this.currentOperator;
    if (previousOp != null) {
        this.compute();
        this.leftOperand = this.result;
        this.rightOperand = null;
    }
    else {
        this.leftOperand = this.currentInput;
        this.currentInput = null;
    }
    this.currentOperator = inOperator;
}

calculator.standardMode.prototype.appendNumber = function(inNumber) {
    this.currentInput = (this.currentInput == null ? "" : this.currentInput) + inNumber.toString();
}