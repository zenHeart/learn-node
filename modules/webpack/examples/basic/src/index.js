import _ from 'lodash';
import printMs from './print.js'

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['hello','webpack'],' ');

    btn.innerHTML = '测试开发模式';
    btn.onclick = printMs;
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());