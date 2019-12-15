import style from './index.scss'; // eslint-disable-line no-unused-vars
import Table from './table';
import blockGridConstructor from './block';

const element = document.createElement('DIV');
const table1 = new Table();

const gameState = {
  end: 0,
  running: 1,
};

const gameText = {
  start: 'Click blocks and try to avoid mines.',
  lose: 'You have lost the game.',
  win: 'You have won the game!',
};

const game = {
  emptySpaces: 0,
  openedSpaces: 0,
  blocks: [],
  state: gameState.running,
  nearbyMineCount: function nearbyMineCount(row, column) {
    let mineCount = 0;
    const startingRow = row !== 0 ? row - 1 : row;
    const endingRow = row + 1 < this.blocks.length ? row + 1 : row;
    const startingColumn = column !== 0 ? column - 1 : column;
    const endingColumn = column + 1 < this.blocks[row].length
      ? this.blocks[row].length - 1 : column;

    for (let i = startingRow; i <= endingRow; i += 1) {
      for (let j = startingColumn; j <= endingColumn; j += 1) {
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

        if (this.state === gameState.end) return;
        if (block.isOpened) return;
        if (block.isMarked) return;

        block.open();
        this.openedSpaces += 1;

        if (block.isMine) {
          element.innerHTML = gameText.lose;
          this.state = gameState.end;
          return;
        }

        /* TODO: Handle 0 mines nearby
         *   - should open other 0 mine block if any */
        block.element.innerHTML = this.nearbyMineCount(data.row, data.index);

        if (this.openedSpaces === this.emptySpaces) {
          element.innerHTML = gameText.win;
          this.state = gameState.end;
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

element.innerHTML = gameText.start;

container1.classList.add('content__wrapper');
container2.classList.add('content__wrapper');

container1.appendChild(element);
game.blocks = blockGrid(10, 10);
container2.appendChild(table1.build(game.blocks));

row1.appendChild(container1);
row2.appendChild(container2);

document.body.appendChild(row1);
document.body.appendChild(row2);
