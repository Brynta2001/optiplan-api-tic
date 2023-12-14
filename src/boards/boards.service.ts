import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { StagesService } from '../stages/stages.service';
import { v4 as uuid } from 'uuid';
import { Stage } from '../stages/entities/stage.entity';

@Injectable()
export class BoardsService {

  private readonly logger = new Logger('BoardsService')

  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
  ){}

  async create(createBoardDto: CreateBoardDto) {
    try {
      const { columns, ...boardDetails } = createBoardDto;

      const stages = [];
      for (let i = 0; i < columns; i++) {
        const stage = {
          name: `Column ${i + 1}`
        };
        stages.push(stage);
      }
      console.log(columns)

      const board = this.boardRepository.create({
        ...boardDetails,
        stages: stages.map((stage) => this.stageRepository.create({name: stage.name})),
      });

      const newBoard = await this.boardRepository.save(board);
      return newBoard;
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
      throw new NotFoundException(`Board with id ${id} not found`);
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
    console.log(error)
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
