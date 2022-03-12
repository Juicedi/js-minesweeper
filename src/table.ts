import { Block } from './blockInterface';

class Table {
  build(blocks: Array<Block>[]): HTMLElement {
    const domTable: HTMLElement = document.createElement('TABLE');

    for (let i = 0; i < blocks.length; i += 1) {
      const row: HTMLElement = document.createElement('tr');

      for (let j: number = 0; j < blocks[i].length; j += 1) {
        const item: HTMLElement = blocks[i][j].element;
        row.appendChild(item);
      }

      row.classList.add('minesweeper__row');
      domTable.appendChild(row);
    }

    domTable.classList.add(Table.classString);
    return domTable;
  }

  static get classString(): string {
    return 'minesweeper__table';
  }
}

export default Table;
