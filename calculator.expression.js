
if (typeof calculator == "undefined") {
    calculator = function() { }
}

// expression interface
calculator.expression = function() { }

calculator.expression.prototype.compute = function() { }

// literalExpression
calculator.literalExpression = function(number) {
    this.number = number;
}

calculator.literalExpression.prototype.compute = function() {
    return this.number == null ? "" : this.number.toString();
}

// unaryExpression
calculator.unaryExpression = function(exp, operator) {
    if (operator == null) {
        throw new Error("argument 'operator' null exception.");
    }
    this.exp = exp;
    this.operator = operator;
}

calculator.unaryExpression.prototype.compute = function() {
    return this.operator(this.exp);
}

// binaryExpression
calculator.binaryExpression = function(leftExp, rightExp, operator) {
    if (operator == null) {
        throw new Error("argument 'operator' null exception.");
    }
    this.leftExp = leftExp;
    this.rightExp = rightExp;
    this.operator = operator;
}

// ternaryExpression
calculator.ternaryExpression = function(leftExp, middleExp, rightExp, operator) {
    if (operator == null) {
        throw new Error("argument 'operator' null exception.");
    }
    this.leftExp = leftExp;
    this.middleExp = middleExp;
    this.rightExp = rightExp;
    this.operator = operator;
}

calculator.ternaryExpression.prototype.compute = function() {
    return this.operator(this.leftExp, this.middleExp, this.rightExp);
}


// expressionBuilder
calculator.expressionBuilder = function() { }

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