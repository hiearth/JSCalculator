
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
    return this.number == null ? "" : this.number;
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

calculator.binaryExpression.prototype.compute = function() {
    var leftOperand = this.leftExp.compute();
    var rightOperand = this.rightExp.compute();
    return this.operator(leftOperand, rightOperand);
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
    var leftOperand = this.leftExp.compute();
    var middleOperand = this.middleExp.compute();
    var rightOperand = this.rightExp.compute();
    return this.operator(this.leftExp, this.middleExp, this.rightExp);
}