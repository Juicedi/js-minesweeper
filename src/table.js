import Block from './block';

const table = {
  class: 'minesweeper__table',
  build: function hello(width, height) {
    const domTable = document.createElement('TABLE');

    for (let i = 0; i < height; i += 1) {
      const row = document.createElement('tr');

      for (let j = 0; j < width; j += 1) {
        row.appendChild(new Block().element);
      }

      row.classList.add('minesweeper__row');
      domTable.appendChild(row);
    }

    domTable.classList.add(this.class);
    return domTable;
  },
};

export default table;
