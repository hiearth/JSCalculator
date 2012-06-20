
if (typeof calculator == "undefined") {
    calculator = function() { }
}

calculator.operators = function() { }

calculator.operators.plus = function(op1, op2) {
    return op1 + op2;
}

calculator.operators.minus = function(op1, op2) {
    return op1 - op2;
}

calculator.operators.multiply = function(op1, op2) {
    return op1 * op2;
}

calculator.operators.divide = function(op1, op2) {
    if (op2 == 0) {

    }
    return op1 / op2;
}

calculator.operators.percent = function(op) {
    return op * 100;
}

calculator.operators.squareRoot = function(op) {
    if (op < 0) {

    }
    return Math.sqrt(op);
}