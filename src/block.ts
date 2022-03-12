const blockStyle = require('./block.scss'); // eslint-disable-line no-unused-vars

import { Game } from './gameInterface';
import { Block } from './blockInterface';
import { IGameEvent } from './gameEventInterface';

function click(game: Game, e: Event) {
  const { row, index } = this;
  e.preventDefault();
  // if (game.state === 'ended') return;
  game.event({ event: e.type, row, index } as IGameEvent);
}

export function blockGrid(width: number, height: number, game: Game): Array<Block>[] {
  if (width <= 0) {
    throw new Error('Width cannot be <= 0');
  }

  if (height <= 0) {
    throw new Error('Height cannot be <= 0');
  }

  if (!game) {
    throw new Error('Cannot create block grid without game parameter');
  }

  const grid = [];

  for (let i = 0; i < height; i += 1) {
    const row = [];

    for (let j = 0; j < width; j += 1) {
      const block = new Block();

      if (!block.isMine) {
        game.event({ event: 'empty++' });
      }

      block.element.classList.add(block.classString);
      block.element.addEventListener('click', click.bind(block, game));
      block.element.addEventListener('contextmenu', click.bind(block, game));
      block.row = i;
      block.index = j;
      row.push(block);
    }

    grid.push(row);
  }

  return grid;
}

export default blockGrid;
