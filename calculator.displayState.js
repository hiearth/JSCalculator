
if (typeof calculator == "undefined") {
    calculator = function() { }
}

calculator.displayInfo = function(inCurrentInput, inExpDisplay) {
    this.currentInput = inCurrentInput;
    this.expDisplay = inExpDisplay;
}

calculator.displayState = function(inExpressionBuilder) {

}

calculator.displayState.getDisplayInfo = function(inExpressionBuilder) {
}

calculator.displayState.nextStateByCommand = function(inCommand, inExpressionBuilder) {

}

calculator.displayState.nextStateByOperator = function(inOperator, inExpressionBuilder) {

}

//calculator.inputNumberState = function() {

//}


//instantComputeState 
calculator.instantComputeState = function(inExpressionBuilder) {
    this.result = inExpressionBuilder.getExpressionResult();
}

calculator.instantComputeState.prototype.getDisplayInfo = function(inExpressionBuilder) {
    var expDisplay = inExpressionBuilder.toString();
    return new calculator.displayInfo(this.result, expDisplay);
}

calculator.instantComputeState.prototype.nextStateByCommand = function(inCommand, inExpressionBuilder) {
    if (inCommand == calculator.standardMode.prototype.compute) {
        return new calculator.expAsWholeState(inExpressionBuilder);
    }
    return this;
}

calculator.instantComputeState.prototype.nextStateByOperator = function(inOperator, inExpressionBuilder) {
    var lowestOperator = inExpressionBuilder.findLowestPriorityOperator(inExpressionBuilder.expressionFragment).operator;
    if (lowestOperator != null && calculator.operators.comparePriority(inOperator, lowestOperator) > 0) {

        return new calculator.waitInputState(inExpressionBuilder);
    }
    return this;
}

calculator.instantComputeState.prototype.nextStateByNumber = function(inExpressionBuilder) {
    return new calculator.waitInputState(inExpressionBuilder);
}


//expAsWholeState
calculator.expAsWholeState = function(inExpressionBuilder) {
    var expAsWhole = inExpressionBuilder.getExpression();
    inExpressionBuilder.init();
    inExpressionBuilder.appendExpression(expAsWhole);
}

calculator.expAsWholeState.prototype.getDisplayInfo = function(inExpressionBuilder) {
    var result = inExpressionBuilder.getExpressionResult();
    var expDisplay = inExpressionBuilder.toString() + " = ";
    return new calculator.displayInfo(result, expDisplay);
}

calculator.expAsWholeState.prototype.nextStateByCommand = function(inCommand, inExpressionBuilder) {
    return this;
}

calculator.expAsWholeState.prototype.nextStateByOperator = function(inOperator, inExpressionBuilder) {
    return new calculator.instantComputeState(inExpressionBuilder);
}

calculator.expAsWholeState.prototype.nextStateByNumber = function(inExpressionBuilder) {
    return new calculator.waitInputState(inExpressionBuilder);
}


//waitInputState 
calculator.waitInputState = function(inExpressionBuilder) {

}

calculator.waitInputState.prototype.getDisplayInfo = function(inExpressionBuilder) {
    var expDisplay = inExpressionBuilder.toString();
    return new calculator.displayInfo(inExpressionBuilder.currentInput, expDisplay);
}

calculator.waitInputState.prototype.nextStateByCommand = function(inCommand, inExpressionBuilder) {
    if (inCommand == calculator.standardMode.prototype.compute) {
        return new calculator.expAsWholeState(inExpressionBuilder);
    }
    return this;
}

calculator.waitInputState.prototype.nextStateByOperator = function(inOperator, inExpressionBuilder) {
    var lowestOperator = inExpressionBuilder.findLowestPriorityOperator(inExpressionBuilder.expressionFragment).operator;
    if (lowestOperator != null
               && calculator.operators.comparePriority(inOperator, lowestOperator) <= 0) {

        return new calculator.instantComputeState(inExpressionBuilder);
    }
    return this;
}

calculator.waitInputState.prototype.nextStateByNumber = function(inExpressionBuilder) {
    return this;
}
