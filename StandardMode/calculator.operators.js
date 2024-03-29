
if (typeof calculator == "undefined") {
    calculator = function() { }
}

calculator.operators = function() { }

calculator.operators.plus = function(op1, op2) {
    return op1 + op2;
}

calculator.operators.plus.toString = function() {
    return "+";
}

calculator.operators.minus = function(op1, op2) {
    return op1 - op2;
}

calculator.operators.minus.toString = function() {
    return "-";
}

calculator.operators.multiply = function(op1, op2) {
    return op1 * op2;
}

calculator.operators.multiply.toString = function() {
    return "*";
}

calculator.operators.divide = function(op1, op2) {
    if (op2 == 0) {
        throw new Error("divisor cannot be zero.[divide method]");
    }
    return op1 / op2;
}

calculator.operators.divide.toString = function() {
    return "/";
}

calculator.operators.percent = function(op) {
    return op * 100;
}

calculator.operators.percent.toString = function() {
    return "%";
}

calculator.operators.squareRoot = function(op) {
    if (op < 0) {
        throw new Error("operand cannot be negative.[squareRoot]");
    }
    return Math.sqrt(op);
}

calculator.operators.squareRoot.toString = function() {
    return "√";
}

calculator.operators.operatorsByDescendingPriority = function() {
    return new Array(new Array(this.squareRoot, this.percent),
                     new Array(this.multiply, this.divide),
                     new Array(this.plus, this.minus)
                 );
}

calculator.operators.comparePriority = function(inOperator1, inOperator2) {
    var result = 0;
    var operatorsArray = this.operatorsByDescendingPriority();
    var found = false;
    for (var priorityIndex = 0; priorityIndex < operatorsArray.length && !found; priorityIndex++) {
        var operators = operatorsArray[priorityIndex];
        for (var index = 0; index < operators.length; index++) {
            if (inOperator1 == operators[index]) {
                result += 1;
                found = true;
            }
            if (inOperator2 == operators[index]) {
                result -= 1;
                found = true;
            }
        }
    }
    return result;
}

calculator.operators.isOperator = function(inOperator) {
    var operatorsArray = this.operatorsByDescendingPriority();
    for (var priorityIndex = 0; priorityIndex < operatorsArray.length; priorityIndex++) {
        var operators = operatorsArray[priorityIndex];
        for (var index = 0; index < operators.length; index++) {
            if (inOperator == operators[index]) {
                return true;
            }
        }
    }
    return false;
}