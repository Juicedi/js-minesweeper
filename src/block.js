import style from './block.scss'; // eslint-disable-line no-unused-vars

class Block {
  constructor() {
    this.element = document.createElement('td');
    this.isMine = Math.random() > 0.9;
    this.classString = 'minesweeper__block';
  }

  get isOpened() {
    return this.privOpened ? this.privOpened : false;
  }

  set isOpened(bool) {
    this.privOpened = bool;
  }

  get isMarked() {
    return this.privMarked ? this.privMarked : false;
  }

  set isMarked(bool) {
    this.privMarked = bool;
  }
}

function click(game, e) {
  const block = this;
  e.preventDefault();
  if (game.state === 'ended') return;
  game.event({ event: e.type, row: block.row, index: block.index });
}

export function blockGrid(width, height, game) {
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
      const block = new Block(game);

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
