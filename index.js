// Example
const svg1 = document.getElementById('svg1');
drawExample(svg1);
// console.log(svg1);

const svg2 = document.getElementById('svg2');
// ...
// console.log(Math.min(...data));
// console.log(Math.max(...data));
drawCircle(svg1, {cx: 160, cy: 400 - 300, r: 20, fill: 'orange', id: 'circle-2'});

document.getElementById('circle-2-button').onclick = function () {
    drawCircle(svg1, {cx: 160, cy: 400 - 300, r: 10, fill: 'purple', id: 'circle-2'});
}
