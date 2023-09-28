import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  message: string;
  @Column()
  type: string;
  @CreateDateColumn()
  createdAt: Date;
}
