import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';
import { Board } from 'src/boards/entities/board.entity';
import { BoardsService } from 'src/boards/boards.service';
import { Role } from 'src/auth/entities/role.entity';


@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,

    private readonly boardService: BoardsService,
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
    /*const seedBoards = initialData.boards;
    const boards: Board[] = [];
    seedBoards.forEach( board => {
      boards.push(this.boardRepository.create(board));
    })

    await this.boardRepository.save(boards);
    return boards;*/

    const seedBoards = initialData.boards;
    const insertPromises = [];
    seedBoards.forEach( board => {
      insertPromises.push(this.boardService.create(board));
    });
    return await Promise.all(insertPromises);
  }

  async deleteBoards(){
    const queryBuilder = this.boardRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute();
  }

  async createRoles(){
    const seedRoles = initialData.roles;
    const roles = seedRoles.map( role => {
      return this.roleRepository.create(role);
    });

    return await this.roleRepository.save(roles);;
  }
}
