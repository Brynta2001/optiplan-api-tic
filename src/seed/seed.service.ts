import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
}
