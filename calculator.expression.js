
if (typeof calculator == "undefined") {
    calculator = function() { }
}

// expression interface
calculator.expression = function() {
    this.name = "expression";
}

calculator.expression.prototype.compute = function() { }

calculator.expression.prototype.isExpression = function(inExpression) {
    return inExpression instanceof calculator.expression;
}

// literalExpression
calculator.literalExpression = function(number) {
    calculator.expression.call(this);
    this.number = number;
}

calculator.literalExpression.prototype = new calculator.expression();

calculator.literalExpression.prototype.compute = function() {
    return this.number == null ? "" : this.number;
}

calculator.literalExpression.prototype.toString = function() {
    return this.number == null ? "" : this.number.toString();
}

calculator.bracketExpression = function(exp) {
    calculator.expression.call(this);
    this.exp = exp;
}

calculator.bracketExpression.prototype = new calculator.expression();

calculator.bracketExpression.prototype.compute = function() {
    return this.exp.compute();
}

calculator.bracketExpression.prototype.toString = function() {
    return "(" + this.exp.toString() + ")";
}

// unaryExpression
calculator.unaryExpression = function(exp, operator) {
    if (operator == null) {
        throw new Error("argument 'operator' null exception.");
    }
    calculator.expression.call(this);
    this.exp = exp;
    this.operator = operator;
}

calculator.unaryExpression.prototype = new calculator.expression();

calculator.unaryExpression.prototype.compute = function() {
    return this.operator(this.exp);
}

calculator.unaryExpression.prototype.toString = function() {
    return this.operator.toString() + this.exp.toString();
}

// binaryExpression
calculator.binaryExpression = function(leftExp, rightExp, operator) {
    if (operator == null) {
        throw new Error("argument 'operator' null exception.");
    }
    calculator.expression.call(this);
    this.leftExp = leftExp;
    this.rightExp = rightExp;
    this.operator = operator;
}

calculator.binaryExpression.prototype = new calculator.expression();

calculator.binaryExpression.prototype.compute = function() {
    var leftOperand = this.leftExp.compute();
    var rightOperand = this.rightExp.compute();
    return this.operator(leftOperand, rightOperand);
}

calculator.binaryExpression.prototype.toString = function() {
    return this.leftExp.toString() + " " + this.operator.toString() + " " + this.rightExp.toString();
}

// ternaryExpression
calculator.ternaryExpression = function(leftExp, middleExp, rightExp, operator) {
    if (operator == null) {
        throw new Error("argument 'operator' null exception.");
    }
    calculator.expression.call(this);
    this.leftExp = leftExp;
    this.middleExp = middleExp;
    this.rightExp = rightExp;
    this.operator = operator;
}

calculator.ternaryExpression.prototype = new calculator.expression();

calculator.ternaryExpression.prototype.compute = function() {
    var leftOperand = this.leftExp.compute();
    var middleOperand = this.middleExp.compute();
    var rightOperand = this.rightExp.compute();
    return this.operator(this.leftExp, this.middleExp, this.rightExp);
}

calculator.ternaryExpression.prototype.toString = function() {
    return this.operator.toString()
           + this.leftExp.toString() + " " + this.middleExp.toString() + " " + this.rightExp.toString();
}