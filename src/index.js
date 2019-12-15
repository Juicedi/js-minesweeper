import style from './index.scss'; // eslint-disable-line no-unused-vars
import Table from './table';
import blockGridConstructor from './block';

const element = document.createElement('DIV');
const table1 = new Table();
const game = {
  emptySpaces: 0,
  openedSpaces: 0,
  blocks: [],
  state: 'running',
  nearbyMineCount: function nearbyMineCount(row, index) {
    let mineCount = 0;
    const startingRow = row !== 0 ? row - 1 : row;
    const endingRow = row + 1 < this.blocks.length ? row + 1 : row;
    const startingIndex = index !== 0 ? index - 1 : index;
    const endingIndex = index + 1 < this.blocks[row].length
      ? this.blocks[row].length - 1 : index;

    for (let i = startingRow; i <= endingRow; i += 1) {
      for (let j = startingIndex; j <= endingIndex; j += 1) {
        mineCount += this.blocks[i][j].isMine;
      }
    }

    return mineCount;
  },
  event: function handleGameEvent(data) {
    switch (data.event) {
      case 'empty++': {
        this.emptySpaces += 1;
        break;
      }
      case 'click': {
        const block = this.blocks[data.row][data.index];

        if (block.isOpened) return;
        if (block.isMarked) return;

        block.open();
        this.openedSpaces += 1;

        if (block.isMine) {
          element.innerHTML = 'you lost';
          this.state = 'ended';
          return;
        }

        block.element.innerHTML = this.nearbyMineCount(data.row, data.index);

        if (this.openedSpaces === this.emptySpaces) {
          element.innerHTML = 'you won';
          this.state = 'ended';
        }
        break;
      }
      case 'contextmenu': {
        this.blocks[data.row][data.index].mark();
        break;
      }
      default: {
        break;
      }
    }
  },
};

const blockGrid = blockGridConstructor(game);
const row1 = document.createElement('DIV');
const row2 = document.createElement('DIV');
const container1 = document.createElement('DIV');
const container2 = document.createElement('DIV');

element.innerHTML = 'Click blocks and try to avoid mines.';

container1.classList.add('content__wrapper');
container2.classList.add('content__wrapper');

container1.appendChild(element);
game.blocks = blockGrid(3, 3);
container2.appendChild(table1.build(game.blocks));

row1.appendChild(container1);
row2.appendChild(container2);

document.body.appendChild(row1);
document.body.appendChild(row2);
