import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  // 다른 컴포넌트에서 boards를 수정하지 않기 위해 private를 사용

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board | undefined {
    const foundBoard = this.boards.find((board) => board.id === id);
    if (!foundBoard) {
      throw new NotFoundException(`Not Found ${id} Page`);
    }
    return foundBoard;
  }

  deleteBoard(id: string): void {
    const foundBoard = this.getBoardById(id);
    if (foundBoard) {
      this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
    }
  }

  updateBoard(id: string, updateBoardDto: UpdateBoardDto): Board | undefined {
    const foundBoard = this.getBoardById(id);
    if (foundBoard) {
      foundBoard.title = updateBoardDto.title;
      foundBoard.description = updateBoardDto.description;
    }
    return foundBoard;
  }

  updateBoardStatus(id: string, status: BoardStatus): Board | undefined {
    const foundBoard = this.getBoardById(id);
    if (foundBoard) {
      foundBoard.status = status;
    }
    return foundBoard;
  }
}
