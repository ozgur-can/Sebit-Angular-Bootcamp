let arr = [1, 2, 3, 999];

for (let i = 0; i < arr.length; i++) {
  if (i === 1) {
    console.log(i);
    continue;
  } else if(arr[i] === Math.max(...arr)) {
    console.log(`max value is at index arr[${i}] => ${arr[i]}`);
    break;
  }
}
