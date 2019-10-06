import style from './block.scss'; // eslint-disable-line no-unused-vars

function blockConstructor(game) {
  if (!game) {
    throw new Error('Cannot create block constructor without game parameter');
  }

  class Block {
    constructor() {
      this.element = document.createElement('td');
      this.isMine = Math.random() > 0.9;

      if (!this.isMine) game.event('empty++');

      this.element.classList.add(Block.classString);
      this.element.addEventListener('click', this.open.bind(this));
      this.element.addEventListener('contextmenu', this.mark.bind(this));
    }

    static get classString() {
      return 'minesweeper__block';
    }

    get opened() {
      return this.privOpened ? this.privOpened : false;
    }

    set opened(bool) {
      this.privOpened = bool;
    }

    get marked() {
      return this.privMarked ? this.privMarked : false;
    }

    set marked(bool) {
      this.privMarked = bool;
    }

    mark(e) {
      e.preventDefault();

      if (game.state === 'ended') return;
      if (this.opened) return;

      if (this.marked) {
        this.marked = false;
        this.element.classList.remove(`${Block.classString}--marked`);
      } else {
        this.marked = true;
        this.element.classList.add(`${Block.classString}--marked`);
      }
    }

    open() {
      if (this.marked) return;
      if (game.state === 'ended') return;

      this.opened = true;

      if (this.isMine) {
        this.element.classList.add(`${Block.classString}--mined`);
        game.event('mine');
        return;
      }

      this.element.classList.add(`${Block.classString}--opened`);
      game.event('empty');
    }
  }

  return Block;
}

export default blockConstructor;
