import style from './index.scss'; // eslint-disable-line no-unused-vars
import Table from './table';
import BlockConstructor from './block';

const element = document.createElement('DIV');

window.game = {
  emptySpaces: 0,
  openedSpaces: 0,
  state: 'running',
  event: function handleGameEvent(event) {
    switch (event) {
      case 'empty++': {
        this.emptySpaces += 1;
        break;
      }
      case 'empty': {
        this.openedSpaces += 1;

        if (this.openedSpaces === this.emptySpaces) {
          element.innerHTML = 'you won';
          this.state = 'ended';
        }

        break;
      }
      case 'end': {
        element.innerHTML = 'you lost';
        this.state = 'ended';
        break;
      }
      default: {
        console.log(event);
        break;
      }
    }
  },
};

const row1 = document.createElement('DIV');
const row2 = document.createElement('DIV');
const container1 = document.createElement('DIV');
const container2 = document.createElement('DIV');
const table1 = new Table(game);

element.innerHTML = 'höpön löpön pöppö';

container1.classList.add('content__wrapper');
container2.classList.add('content__wrapper');

container1.appendChild(element);
container2.appendChild(table1.build(new BlockConstructor(game), 3, 3));

row1.appendChild(container1);
row2.appendChild(container2);

document.body.appendChild(row1);
document.body.appendChild(row2);
