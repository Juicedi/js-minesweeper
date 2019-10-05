import style from './block.scss'; // eslint-disable-line no-unused-vars

const creator = (function blockCreator() {
  function Block() {
    this.element = document.createElement('td');
    this.element.classList.add(this.class);
    this.element.addEventListener('click', this.reveal.bind(this));
    this.element.addEventListener('contextmenu', this.mark.bind(this));
  }

  Block.prototype.class = 'minesweeper__block';
  Block.prototype.marked = false;
  Block.prototype.opened = false;

  Block.prototype.mark = function mark(e) {
    e.preventDefault();

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

    this.opened = true;
    this.element.classList.add(`${this.class}--opened`);
  };

  return Block;
}());

export default creator;
