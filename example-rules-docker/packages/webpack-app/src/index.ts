import greet from 'utils/index.js';
import * as _ from 'lodash';


function component() {
    const element = document.createElement('div');
    const message: string = greet('TypeScript Webpack App');
    element.innerHTML = _.join([message], ' ');
    return element;
}

document.body.appendChild(component());
