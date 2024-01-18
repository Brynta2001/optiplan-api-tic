import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Stage } from '../stages/entities/stage.entity';
import { User } from 'src/auth/entities/user.entity';

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
    const { columns, ...boardDetails } = createBoardDto;
    if (columns < 1) throw new BadRequestException('Columns must be greater than 0');
    if (columns > 10) throw new BadRequestException('Columns must be less than 10');

    const columnNames = ['To Do', 'In Progress', 'Done', 'Column 4', 'Column 5', 'Column 6', 'Column 7', 'Column 8', 'Column 9', 'Column 10'];

    try {
      const stages = [];
      for (let i = 0; i < columns; i++) {
        const stage = {
          // name: `Column ${i + 1}`
          name: `${columnNames[i]}`
        };
        stages.push(stage);
      }

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

  async findOne(id: string) {
    const board = await this.boardRepository.find({
      where: {id: id},
      relations: ['stages'],
    });
    if (!board){
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return board;
  }

  async findByUser(user: User) {

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

  async remove(id: string) {
    const board = await this.findOne(id);
    if (!board){
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    await this.boardRepository.remove(board);
  }

  private handleDBExceptions(error:any){
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }
}
