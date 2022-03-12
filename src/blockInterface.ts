interface IBlock {
  element: HTMLElement;
  isMine: boolean;
  classString: string;
  isOpened: boolean;
  isMarked: boolean;
  row: number;
  index: number;
}

export class Block implements IBlock {
  element = document.createElement('td');
  isMine = Math.random() > 0.8;
  classString = 'minesweeper__block';
  isOpened = false;
  isMarked = false;
  row = -1;
  index = -1;
}
