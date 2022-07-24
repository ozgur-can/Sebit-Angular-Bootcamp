// let gun = 12
// let ay = 1
// let yil = 1988

// console.log(`${gun} ${ay} ${yil}`);

// var c = 199
// console.log(c, 'first');
// {
//     var c = 5353
//     console.log(c, 'inside');
// }
// console.log(c, 'last');

// let c = 555
// console.log(c, 'first');
// {
//     let c = 9191
//     console.log(c, 'inside');
// }
// console.log(c, 'last');

// var c = 199
// console.log(c, 'first');
// {
//     var c = 5353
//     console.log(c, 'inside');
// }
// console.log(c, 'last');


// const btn = document.querySelector('button');
// const btn1 = document.querySelector('#buttonId');
// const btn2 = document.querySelector('.buttonClass');
// const btn3 = document.getElementById('buttonId');
// const btn4 = document.getElementsByClassName('buttonClass');

// btn3.addEventListener('click', (element) => {
//     console.log('clicked');
// })

function add() {
    console.log('clicked 2');
    const liEl = document.createElement('li')
    liEl.textContent = 'JS'
    // ulElement.insertBefore(liEl, ulElement.firstChild)
    ulElement.append(liEl)
}

const ulElement = document.querySelector('ul')
const liElements = document.querySelectorAll('li');

liElements.forEach(element => {
    element.addEventListener('click', e => {
        e.target.style.backgroundColor = 'lightblue'
    })
})

liElements.forEach(element => {
    element.addEventListener('click', e => {
       e.target.remove()
    })
})