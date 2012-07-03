
if (typeof calculator == "undefined") {
    calculator = function() { }
}

calculator.standardMode = function() {
    this.result = null;
    this.expressionBuilder = new calculator.expressionBuilder();
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
    var expression = this.expressionBuilder.getExpression();
    if (expression != null) {
        this.result = expression.compute();
    }
    this.notify();
}

calculator.standardMode.prototype.setCurrentOperator = function(inOperator) {
    this.expressionBuilder.appendOperator(inOperator);
    this.notify();
}

calculator.standardMode.prototype.appendNumber = function(inNumber) {
    this.expressionBuilder.appendNumber(inNumber);
    this.notify();
}

calculator.standardMode.prototype.notify = function() {
    $("currentInput").value = this.expressionBuilder.currentInput;
    $("expDisplay").value = this.expressionBuilder.expressionFragment;
    if (this.result != null) {
        $("currentInput").value = this.result;
    }
}