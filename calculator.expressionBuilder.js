
if (typeof calculator == "undefined") {
    calculator = function() { }
}

// expressionBuilder

calculator.expressionBuilder = function() {
    this.init();
}

calculator.expressionBuilder.prototype.init = function() {
    this.expressionFragment = new Array();
    this.currentInput = null;
    this.expressionFactory = new calculator.expressionFactory();
}

calculator.expressionBuilder.prototype.appendNumber = function(inNumber) {
    this.currentInput = (this.currentInput == null ? "" : this.currentInput) + inNumber.toString();
}

calculator.expressionBuilder.prototype.appendOperator = function(inOperator) {
    if (this.currentInput != null) {
        this.expressionFragment.push(this.currentInput);
    }
    this.currentInput = null;
    this.expressionFragment.push(inOperator);
}

calculator.expressionBuilder.prototype.appendExpression = function(inExpression) {
    var bracketExp = this.expressionFactory.createBracket(inExpression);
    this.expressionFragment.push(bracketExp);
}

calculator.expressionBuilder.prototype.getExpressionResult = function() {
    var expression = this.getExpression();
    if (expression != null) {
        return expression.compute();
    }
}

calculator.expressionBuilder.prototype.getExpression = function() {
    if (this.currentInput != null) {
        this.expressionFragment.push(this.currentInput);
        this.currentInput = null;
    }
    return this.buildExpression(this.expressionFragment);
}

// the logic of expression construction is complicated,
// so I should decompose the expresson to simple expressions and then assemble them
calculator.expressionBuilder.prototype.buildExpression = function(expressionFragment) {
    if (expressionFragment.length == 0) {
        return null;
    }
    if (expressionFragment.length == 1) {
        if (calculator.expression.prototype.isExpression(expressionFragment[0])) {
            return expressionFragment[0];
        }
        return this.expressionFactory.createLiteral(expressionFragment[0]);
    }
    // binary operator
    var lowestOperator = this.findLowestPriorityOperator(expressionFragment);
    var rootOperator = lowestOperator.operator;
    var separateIndex = lowestOperator.index;
    var leftExpFragment = expressionFragment.slice(0, separateIndex);
    var rightExpFragment = expressionFragment.slice(separateIndex + 1, expressionFragment.length);
    var leftExp = this.buildExpression(leftExpFragment);
    var rightExp = this.buildExpression(rightExpFragment);

    return this.expressionFactory.createBinary(leftExp, rightExp, rootOperator);
}

// initial version
// only + - * /
calculator.expressionBuilder.prototype.findLowestPriorityOperator = function(expressionFragment) {
    // return the operator index and the operator object.
    var lowestOperator = null;
    var lowestIndex = 0;
    for (var index = 0; index < expressionFragment.length; index++) {
        var expAtom = expressionFragment[index];
        if (this.isOperator(expAtom)) {
            if (lowestOperator == null
                || this.comparePriority(lowestOperator, expAtom) >= 0) {
                lowestOperator = expAtom;
                lowestIndex = index;
            }
        }
    }
    return {
        "index": lowestIndex,
        "operator": lowestOperator
    };
}

calculator.expressionBuilder.prototype.clearExpression = function() {
    this.expressionFragment = new Array();
}

calculator.expressionBuilder.prototype.comparePriority = function(inOperator1, inOperator2) {
    return calculator.operators.comparePriority(inOperator1, inOperator2);
}

calculator.expressionBuilder.prototype.isOperator = function(inOperator) {
    return calculator.operators.isOperator(inOperator);
}

calculator.expressionBuilder.prototype.toString = function() {
    return this.expressionFragment.join(" ");
}