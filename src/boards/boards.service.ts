import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {

  private readonly logger = new Logger('BoardsService')

  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ){}

  async create(createBoardDto: CreateBoardDto) {
    try {
      const { columns, ...boardDetails } = createBoardDto;
      const board = this.boardRepository.create(boardDetails);
      await this.boardRepository.save(board);
      return board;
    } catch (error) {
      this.handleDBExceptions(error);
    }
    
  }

  findAll() {
    return `This action returns all boards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const { columns, ...toUpdate } = updateBoardDto;
    const board = await this.boardRepository.preload({id: id, ...toUpdate})
    if (!board){
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    try {
      await this.boardRepository.save(board);
      return board;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }

  private handleDBExceptions(error:any){
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    //console.log(error)
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
