import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchesSchema } from './branches.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"branches",schema:BranchesSchema}]),
  ],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
