import style from './block.scss'; // eslint-disable-line no-unused-vars

const blockConstructor = function getBlockConstructor(game) {
  if (!game) {
    throw new Error('Cannot create block constructor without game parameter');
  }

  function Block() {
    this.element = document.createElement('td');
    this.isMine = Math.random() > 0.9;

    if (!this.isMine) game.event('empty++');

    this.element.classList.add(this.class);
    this.element.addEventListener('click', this.open.bind(this));
    this.element.addEventListener('contextmenu', this.mark.bind(this));
  }

  Block.prototype.class = 'minesweeper__block';
  Block.prototype.marked = false;
  Block.prototype.opened = false;

  Block.prototype.mark = function mark(e) {
    e.preventDefault();

    if (game.state === 'ended') return;
    if (this.opened) return;

    if (this.marked) {
      this.marked = false;
      this.element.classList.remove(`${this.class}--marked`);
    } else {
      this.marked = true;
      this.element.classList.add(`${this.class}--marked`);
    }
  };

  Block.prototype.open = function open() {
    if (this.marked) return;
    if (game.state === 'ended') return;

    this.opened = true;

    if (this.isMine) {
      this.element.classList.add(`${this.class}--mined`);
      game.event('end');
      return;
    }

    this.element.classList.add(`${this.class}--opened`);
    game.event('empty');
  };

  return Block;
};

export default blockConstructor;
