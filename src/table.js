class Table {
  build(blocks) {
    const domTable = document.createElement('TABLE');

    for (let i = 0; i < blocks.length; i += 1) {
      const row = document.createElement('tr');

      for (let j = 0; j < blocks[i].length; j += 1) {
        const item = blocks[i][j].element;
        row.appendChild(item);
      }

      row.classList.add('minesweeper__row');
      domTable.appendChild(row);
    }

    domTable.classList.add(Table.classString);
    return domTable;
  }

  static get classString() {
    return 'minesweeper__table';
  }
}

export default Table;
