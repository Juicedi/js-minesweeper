class Table {
  build(Block, width, height) {
    const domTable = document.createElement('TABLE');

    for (let i = 0; i < height; i += 1) {
      const row = document.createElement('tr');

      for (let j = 0; j < width; j += 1) {
        const block = new Block();
        row.appendChild(block.element);
      }

      row.classList.add('minesweeper__row');
      domTable.appendChild(row);
    }

    domTable.classList.add(this.class);
    return domTable;
  }

  static get classString() {
    return 'minesweeper__table';
  }
}

export default Table;
