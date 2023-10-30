function factorial(num) {
    if (num === 0 || num === 1) {
      return num;
    }
    return num * factorial(num - 1);
  }
  
  let n = factorial(8);
  let a = "blabla"
  console.log("cest du " + a); // 40320