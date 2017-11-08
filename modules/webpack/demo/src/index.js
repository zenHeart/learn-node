import _ from 'lodash';
import './style.css';
import Loading from './loading.gif';
import testXml from './test.xml';
import testJson from './test.json';

function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');

    //添加 loading 图标
    var myImg = new Image();
    myImg.src = Loading;

    element.appendChild(myImg);
    console.log('输出 xml 数据',testXml);
    console.log('输出 json 数据',testJson);
    return element;
}

document.body.appendChild(component());