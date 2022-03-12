import { Block } from './blockInterface';

export interface Game {
  emptySpaces: number;
  openedSpaces: number;
  blocks: Array<Block>[];
  state: boolean;
  nearbyMineCount(row: number, column: number): number;
  openSurroundingBlocks(row: number, column: number): void;
  open(paramBlock: Block): void;
  event(data: any): void;
}
