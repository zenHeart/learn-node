var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

// 1: Create a function that declares what the DOM should look like
function render(count) {
    return h(
        'div',
        {
            style: {
                textAlign: 'center',
                lineHeight: 100 + count + 'px',
                border: '1px solid red',
                width: 100 + count + 'px',
                height: 100 + count + 'px'
            }
        },
        [String(count)]
    );
}

document.body.appendChild(createElement(render(1)));
