const table = (function creator() {
  function Table() { }

  Table.prototype.class = 'minesweeper__table';

  Table.prototype.build = function buildTable(Block, width, height) {
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
  };

  return Table;
}());

export default table;
