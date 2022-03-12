const html = require('./index.html'); // eslint-disable-line no-unused-vars
const style = require('./index.scss'); // eslint-disable-line no-unused-vars

import Table from './table';
import { Game } from './gameInterface';
import { Block } from './blockInterface';
import { blockGrid } from './block';
import { IGameEvent } from './gameEventInterface';

const element = document.createElement('DIV');
const table1 = new Table();

const gameState = {
  end: false,
  running: true,
};

const gameText = {
  start: 'Click blocks and try to avoid mines.',
  lose: 'You have lost the game.',
  win: 'You have won the game!',
};

const game: Game = {
  emptySpaces: 0,
  openedSpaces: 0,
  blocks: [],
  state: gameState.running,
  nearbyMineCount: function nearbyMineCount(row: number, column: number): number {
    let mineCount: number = 0;
    const startingRow: number = row !== 0 ? row - 1 : row;
    const endingRow: number = row + 1 < this.blocks.length ? row + 1 : row;
    const startingColumn: number = column !== 0 ? column - 1 : column;
    const endingColumn: number = column + 1 < this.blocks[row].length
      ? column + 1
      : column;

    for (let i: number = startingRow; i <= endingRow; i += 1) {
      for (let j: number = startingColumn; j <= endingColumn; j += 1) {
        mineCount += this.blocks[i][j].isMine;
      }
    }

    return mineCount;
  },
  openSurroundingBlocks: function openSurroundingBlocks(row: number, column: number) {
    const startingRow: number = row !== 0 ? row - 1 : row;
    const endingRow: number = row + 1 < this.blocks.length ? row + 1 : row;
    const startingColumn: number = column !== 0 ? column - 1 : column;
    const endingColumn: number = column + 1 < this.blocks[row].length
      ? column + 1
      : column;

    for (let i: number = startingRow; i <= endingRow; i += 1) {
      for (let j: number = startingColumn; j <= endingColumn; j += 1) {
        if (i !== row || j !== column) {
          this.event({ event: 'click', row: i, index: j });
        }
      }
    }
  },
  open: function open(paramBlock: Block): void {
    const block = paramBlock;

    if (block.isMarked) return;

    block.isOpened = true;

    if (block.isMine) {
      block.element.classList.add(`${block.classString}--mined`);
      return;
    }

    block.element.classList.add(`${block.classString}--opened`);
  },
  event: function handleGameEvent(data: IGameEvent) {
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

        this.open(block);
        this.openedSpaces += 1;

        if (block.isMine) {
          element.innerHTML = gameText.lose;
          this.state = gameState.end;
          return;
        }

        block.element.innerHTML = this.nearbyMineCount(data.row, data.index);

        if (parseInt(block.element.innerHTML, 10) === 0) {
          this.openSurroundingBlocks(data.row, data.index);
        }

        if (this.openedSpaces === this.emptySpaces) {
          element.innerHTML = gameText.win;
          this.state = gameState.end;
        }
        break;
      }
      case 'contextmenu': {
        // Mark block on right mouse button click
        const block = this.blocks[data.row][data.index];

        // If block has already been opened, do nothing
        if (block.isOpened) break;

        if (block.isMarked) {
          block.isMarked = false;
          block.element.classList.remove(`${block.classString}--marked`);
        } else {
          block.isMarked = true;
          block.element.classList.add(`${block.classString}--marked`);
        }

        break;
      }
      default: {
        break;
      }
    }
  },
};

const row1 = document.createElement('DIV');
const row2 = document.createElement('DIV');
const container1 = document.createElement('DIV');
const container2 = document.createElement('DIV');

element.innerHTML = gameText.start;

container1.classList.add('content__wrapper');
container2.classList.add('content__wrapper');

container1.appendChild(element);
game.blocks = blockGrid(10, 10, game);
container2.appendChild(table1.build(game.blocks));

row1.appendChild(container1);
row2.appendChild(container2);

document.body.appendChild(row1);
document.body.appendChild(row2);

console.log('test');
