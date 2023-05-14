$(document).ready(() => {
  const display1 = document.querySelector(".display-1");
  const display2 = document.querySelector(".display-2");
  const numbers = document.querySelectorAll(".number");
  const operations = document.querySelectorAll(".operation");
  const equal = document.querySelector(".equal");
  const clearAll = document.querySelector(".all-clear");
  const clearLast = document.querySelector(".last-entry-clear");
  let dis1Num = "";
  let dis2Num = "";
  let result = null;
  let lastOperation = "";
  let haveDot = false;

  // handling number and dot operation event
  numbers.forEach(function (number) {
    number.addEventListener("click", function () {
      const val = this.innerText;
      if (val === "." && !haveDot) {
        haveDot = true;
      } else if (val === "." && haveDot) {
        return 0;
      }
      dis2Num += val;
      display2.innerText = dis2Num;
    });
  });

  // arithmetic operation handling event
  operations.forEach(function (operation) {
    operation.addEventListener("click", function () {
      //to prevent same operation at calling multiple time
      if (!dis2Num) return;
      haveDot = false;
      const operationName = this.innerText;
      //hnadling complex operation at same time eg; (23+54/55)
      if (dis1Num && dis2Num && lastOperation) {
        arithmeticOperation();
      } else {
        result = Number(dis2Num);
      }
      clearVar(operationName);
      lastOperation = operationName;
      console.log(result);
    });
  });

  /*while make another complex operation in existing value, 
  the operation manipulation only ono display1 and clearing display2,
   then waiting for another number for good visibility.*/
  function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    display1.innerText = dis1Num;
    display2.innerText = "";
    dis2Num = "";
  }

  // to perform arithmetic operation
  function arithmeticOperation() {
    if (lastOperation === "x") {
      result = Number(result) * Number(dis2Num);
    } else if (lastOperation === "+") {
      result = Number(result) + Number(dis2Num);
    } else if (lastOperation === "-") {
      result = Number(result) - Number(dis2Num);
    } else if (lastOperation === "/") {
      result = Number(result) / Number(dis2Num);
    } else if (lastOperation === "%") {
      result = (Number(result) / 100) * Number(dis2Num);
    }
  }

  // to display the result perform on equal operator.
  equal.addEventListener("click", () => {
    //prevent manipulating itself
    if (!dis2Num || !dis1Num) return;
    haveDot = false;
    arithmeticOperation();
    clearVar();
    display2.innerText = result;
    dis2Num = result;
    dis1Num = "";
  });

  clearAll.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display1.innerText = "";
    display2.innerText = "";
    result = "";
  });

  clearLast.addEventListener("click", () => {
    try {
      dis2Num = dis2Num.slice(0, -1);
      display2.innerText = dis2Num;
    } catch (error) {}
  });
});
