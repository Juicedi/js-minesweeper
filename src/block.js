import style from './block.scss'; // eslint-disable-line no-unused-vars

function blockGridConstructor(game) {
  if (!game) {
    throw new Error('Cannot create block constructor without game parameter');
  }

  class Block {
    constructor() {
      this.element = document.createElement('td');
      this.isMine = Math.random() > 0.9;

      if (!this.isMine) game.event({ event: 'empty++' });

      this.element.classList.add(Block.classString);
      this.element.addEventListener('click', this.click.bind(this));
      this.element.addEventListener('contextmenu', this.click.bind(this));
    }

    static get classString() {
      return 'minesweeper__block';
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

    mark() {
      if (this.isOpened) return;
      if (this.isMarked) {
        this.isMarked = false;
        this.element.classList.remove(`${Block.classString}--marked`);
      } else {
        this.isMarked = true;
        this.element.classList.add(`${Block.classString}--marked`);
      }
    }

    click(e) {
      e.preventDefault();
      if (game.state === 'ended') return;
      game.event({ event: e.type, row: this.row, index: this.index });
    }

    open() {
      if (this.isMarked) return;

      this.isOpened = true;

      if (this.isMine) {
        this.element.classList.add(`${Block.classString}--mined`);
        return;
      }

      this.element.classList.add(`${Block.classString}--opened`);
    }
  }

  function blockGrid(width, height) {
    const grid = [];

    for (let i = 0; i < height; i += 1) {
      const row = [];

      for (let j = 0; j < width; j += 1) {
        const block = new Block();
        block.row = i;
        block.index = j;
        row.push(block);
      }

      grid.push(row);
    }

    return grid;
  }

  return blockGrid;
}

export default blockGridConstructor;
