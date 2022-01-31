import './index.html';

function sum(a, b = 2) {
    return a + b;
}

window.babelResult = sum(b = 8, a = 10);
