import style from './block.scss';

const block = {
  class: 'minesweeper__block',
  build: function build() {
    const item = document.createElement('td');
    item.classList.add(this.class);
    return item;
  },
};

export default block;
