import style from './index.scss'; // eslint-disable-line no-unused-vars
import table from './table';

const helloMessage = 'höpön löpön pöppö';
const row1 = document.createElement('DIV');
const row2 = document.createElement('DIV');
const container1 = document.createElement('DIV');
const container2 = document.createElement('DIV');
const element = document.createElement('DIV');

element.innerHTML = helloMessage;

container1.classList.add('content__wrapper');
container2.classList.add('content__wrapper');

container1.appendChild(element);
container2.appendChild(table.build(3, 8));

row1.appendChild(container1);
row2.appendChild(container2);

document.body.appendChild(row1);
document.body.appendChild(row2);
