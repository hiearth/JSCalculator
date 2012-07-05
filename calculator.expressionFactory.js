
if (typeof calculator == "undefined") {
    calculator = function() { }
}

calculator.expressionFactory = function() { }

calculator.expressionFactory.prototype.createLiteral = function(number) {
    return new calculator.literalExpression(parseFloat(number));
}

calculator.expressionFactory.prototype.createUnary = function(exp, operator) {
    return new calculator.unaryExpression(exp, operator);
}

calculator.expressionFactory.prototype.createBinary = function(leftExp, rightExp, operator) {
    return new calculator.binaryExpression(leftExp, rightExp, operator);
}

calculator.expressionFactory.prototype.createTernary = function(leftExp, middleExp, rightExp, operator) {
    return new calculator.ternaryExpression(leftExp, middleExp, rightExp, operator);
}