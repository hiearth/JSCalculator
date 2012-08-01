
function $(elementId) {
    return document.getElementById(elementId);
}

function extend(subClass, baseClass) {
    function inheritance() { }
    inheritance.prototype = baseClass.prototype;

    subClass.prototype = new inheritance();
    subClass.prototype.constructor = subClass;
    subClass.baseConstructor = baseClass;
    subClass.supClass = baseClass.prototype;
}