import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { Stage } from './entities/stage.entity';
import { Board } from '../boards/entities/board.entity';

@Injectable()
export class StagesService {

  private readonly logger = new Logger('StagesService')

  constructor(
    @InjectRepository(Stage)
    private readonly stageRepository: Repository<Stage>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ){}

  async create(createStageDto: CreateStageDto) {
    const { boardId, ...stageDetails } = createStageDto;

    const board = await this.boardRepository.findOneBy({id: boardId})
    if (!board){
      throw new NotFoundException(`Input board not found`);
    }

    try {
      const stage = this.stageRepository.create({
        ...stageDetails,
        board: board,
      });
      await this.stageRepository.save(stage);
      return {
        id: stage.id,
        name: stage.name,
        boardId: boardId,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return `This action returns all stages`;
  }

  findOne(id: string) {
    const stage = this.stageRepository.findOneBy({id: id});
    if (!stage){
      throw new NotFoundException(`Stage (column) with id ${id} not found`);
    }
    return stage;
  }

  async update(id: string, updateStageDto: UpdateStageDto) {
    const { boardId, ...toUpdate } = updateStageDto;
    
    const board = await this.boardRepository.findOneBy({id: boardId})
    if (!board){
      throw new NotFoundException(`Input board not found`);
    }

    const stage = await this.stageRepository.preload({id: id, board, ...toUpdate})
    if (!stage){
      throw new NotFoundException(`Stage (column) with id ${id} not found`);
    }

    try {
      await this.stageRepository.save(stage);
      return {
        id: stage.id,
        name: stage.name,
        boardId: boardId,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const stage = await this.findOne(id);
    if (!stage){
      throw new NotFoundException(`Stage (column) with id ${id} not found`);
    }
    await this.stageRepository.remove(stage);
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
