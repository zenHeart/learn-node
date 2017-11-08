import _ from 'lodash';
import printMs from './print.js'

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['hello','webpack'],' ');

    btn.innerHTML = 'click me and check the console';
    btn.onclick = printMs;
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());