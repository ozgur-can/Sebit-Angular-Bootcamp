function hello() {
  console.log("hello world");
}

// default paremeter
const ozgur = function (name = "ozgur", surname) {
  console.log(`${name}, ${surname}`);
};

// ozgur();

function square(number) {
  return number * number;
}

// square(4)

// arrow function
const squareNew = (number) => {
  return number * number;
};

// alternative arrow function
// const squareNew = num => num **2

// squareNew(2)

const urunSatis = (urunler,vergi) => {
    let toplam = 0;
    for (let i = 0; i < urunler.length; i++) {
        toplam += urunler[i] + urunler[i] * vergi;
    }

    return toplam
}

console.log(urunSatis([10,20,30], 0.25));