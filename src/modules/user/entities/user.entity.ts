import { Message } from 'src/modules/message/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column({ nullable: true })
  contacts: string;
  @OneToMany(() => Message, (message) => message.user)
  @JoinColumn({ name: 'message_id' })
  messages: Message[];
  @CreateDateColumn()
  cretedAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
}
