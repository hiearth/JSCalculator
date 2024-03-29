
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