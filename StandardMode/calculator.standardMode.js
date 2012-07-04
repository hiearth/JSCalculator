
if (typeof calculator == "undefined") {
    calculator = function() { }
}

calculator.standardMode = function() {
    this.expressionBuilder = new calculator.expressionBuilder();
    this.displayState = new calculator.waitInputState(this.expressionBuilder);
}

calculator.standardMode.prototype.plus = calculator.operators.plus;

calculator.standardMode.prototype.minus = calculator.operators.minus;

calculator.standardMode.prototype.multiply = calculator.operators.multiply;

calculator.standardMode.prototype.divide = calculator.operators.divide;

calculator.standardMode.prototype.percent = calculator.operators.percent;

calculator.standardMode.prototype.squareRoot = calculator.operators.squareRoot;

calculator.standardMode.prototype.clean = function() {

}

calculator.standardMode.prototype.backspace = function() {

}

calculator.standardMode.prototype.compute = function() {
    this.updateStateByCommand(this.compute);
    this.notify();
}

calculator.standardMode.prototype.updateStateByCommand = function(inCommand) {
    this.displayState = this.displayState.nextStateByCommand(inCommand, this.expressionBuilder);
}

calculator.standardMode.prototype.updateStateByOperator = function(inOperator) {
    this.displayState = this.displayState.nextStateByOperator(inOperator, this.expressionBuilder);
}

calculator.standardMode.prototype.updateStateByNumber = function() {
    this.displayState = this.displayState.nextStateByNumber(this.expressionBuilder);
}

calculator.standardMode.prototype.appendOperator = function(inOperator) {
    this.updateStateByOperator(inOperator);
    this.expressionBuilder.appendOperator(inOperator);
    this.notify();
}

calculator.standardMode.prototype.appendNumber = function(inNumber) {
    this.updateStateByNumber();
    this.expressionBuilder.appendNumber(inNumber);
    this.notify();
}

calculator.standardMode.prototype.notify = function() {
    var displayInfo = this.displayState.getDisplayInfo(this.expressionBuilder);
    $("currentInput").value = displayInfo.currentInput;
    $("expDisplay").value = displayInfo.expDisplay;
}

//-----------------------------------------------------------------------------

calculator.standardMode.displayInfo = function(inCurrentInput, inExpDisplay) {
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

//calculator.inputNumberState.getDisplayInfo = function(inExpressionBuilder) {
//    var expDisplay = inExpressionBuilder.toString();
//    return new calculator.standardMode.displayInfo(inExpressionBuilder.currentInput, expDisplay);
//}

//calculator.inputNumberState.nextStateByCommand = function(inCommand, inExpressionBuilder) {

//}

//calculator.inputNumberState.nextStateByOperator = function(inOperator, inExpressionBuilder) {

//}

calculator.instantComputeState = function(inExpressionBuilder) {
    this.result = inExpressionBuilder.getExpressionResult();
}

calculator.instantComputeState.prototype.getDisplayInfo = function(inExpressionBuilder) {
    var expDisplay = inExpressionBuilder.toString();
    return new calculator.standardMode.displayInfo(this.result, expDisplay);
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

calculator.expAsWholeState = function(inExpressionBuilder) {

}

calculator.expAsWholeState.prototype.getDisplayInfo = function(inExpressionBuilder) {
    var result = inExpressionBuilder.getExpressionResult();
    var expDisplay = inExpressionBuilder.toString() + " = ";
    return new calculator.standardMode.displayInfo(result, expDisplay);
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

calculator.waitInputState = function(inExpressionBuilder) {

}

calculator.waitInputState.prototype.getDisplayInfo = function(inExpressionBuilder) {
    var expDisplay = inExpressionBuilder.toString();
    return new calculator.standardMode.displayInfo(inExpressionBuilder.currentInput, expDisplay);
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
