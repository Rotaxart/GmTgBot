import { Module } from '@nestjs/common';
import { MessageController } from '../controllers/message.controller';
import { MessageService } from '../services/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
