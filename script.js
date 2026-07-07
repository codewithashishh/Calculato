const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";
const operators = ["+", "-", "*", "/", "^"];

function updateDisplay() {
    display.value = expression || "0";
}


function clearDisplay() {
    expression = "";
    updateDisplay();
}


function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}


function lastIsOperator() {
    return operators.includes(expression.slice(-1));
}


function appendValue(value) {

    
    if (value === "❤️") {
        display.value = "Made with ❤️";
        return;
    }

    if (operators.includes(value)) {

        if (expression === "") return;

        if (lastIsOperator()) {
            expression = expression.slice(0, -1) + value;
            updateDisplay();
            return;
        }
    }

    if (value === ".") {

        const lastNumber = expression.split(/[+\-*/^]/).pop();

        if (lastNumber.includes(".")) {
            return;
        }
    }

    expression += value;
    updateDisplay();
}


function calculate() {

    if (expression === "") return;

    if (lastIsOperator()) {
        expression = expression.slice(0, -1);
    }

    try {

        const result = eval(
            expression.replace(/\^/g, "**")
        );

        if (!isFinite(result)) {
            display.value = "Cannot divide by 0";
            expression = "";
            return;
        }

        expression = String(result);
        updateDisplay();

    } catch {

        display.value = "Error";
        expression = "";
    }

}


buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        switch (value) {

            case "AC":
                clearDisplay();
                break;

            case "DEL":
                deleteLast();
                break;

            case "=":
                calculate();
                break;

            default:
                appendValue(value);
        }

    });

});


document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (key >= "0" && key <= "9") {
        appendValue(key);
    }

    else if (operators.includes(key)) {
        appendValue(key);
    }

    else if (key === ".") {
        appendValue(".");
    }

    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

});
