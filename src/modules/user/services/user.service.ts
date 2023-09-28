import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.save({
      name: dto.name,
      username: dto.username,
    });

    return { user };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(dto: GetUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    return user;
  }
}
