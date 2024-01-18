import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { Board } from 'src/boards/entities/board.entity';


@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ){}

  async createUsers(){
    this.deleteUsers();
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach( user => {
      users.push(this.userRepository.create(user));
    })

    await this.userRepository.save(users);
    return users;
  }

  async deleteUsers(){
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();
  }

  async createBoards(){
    this.deleteBoards();
    const seedBoards = initialData.boards;
    const boards: Board[] = [];
    seedBoards.forEach( board => {
      boards.push(this.boardRepository.create(board));
    })

    await this.boardRepository.save(boards);
    return boards;
  }

  async deleteBoards(){
    const queryBuilder = this.boardRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();
  }
}
