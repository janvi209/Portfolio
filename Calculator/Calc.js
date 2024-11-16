function AddFunction() {
    
    let num1, num2, answer;
    num1 = parseFloat(document.getElementById("num1").value);
    num2 = parseFloat(document.getElementById("num2").value);

    answer = num1 + num2;
    document.getElementById("calculation").innerHTML = num1 + " + " + num2 + " =";
    document.getElementById("answer").innerHTML = answer;

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";

}

function SubFunction() {

    let num1, num2, answer;
    num1 = parseFloat(document.getElementById("num1").value);
    num2 = parseFloat(document.getElementById("num2").value);

    answer = num1 - num2;
    document.getElementById("calculation").innerHTML = num1 + " - " + num2 + " =";
    document.getElementById("answer").innerHTML = answer;

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
}

function MulFunction() {

    let num1, num2, answer;
    num1 = parseFloat(document.getElementById("num1").value);
    num2 = parseFloat(document.getElementById("num2").value);

    answer = num1 * num2;
    document.getElementById("calculation").innerHTML = num1 + " x " + num2 + " =";
    document.getElementById("answer").innerHTML = answer;

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
}

function DivFunction() {

    let num1, num2, answer;
    num1 = parseFloat(document.getElementById("num1").value);
    num2 = parseFloat(document.getElementById("num2").value);

    answer = num1 / num2;
    document.getElementById("calculation").innerHTML = num1 + " / " + num2 + " =";

    if (num2 == 0) {
        document.getElementById("answer").innerHTML = "Error";
    }
    else {
        document.getElementById("answer").innerHTML = answer;

    }

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
}

function ClearArea() {

    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("calculation").innerHTML = "";
    document.getElementById("answer").innerHTML = "0";
    

}
