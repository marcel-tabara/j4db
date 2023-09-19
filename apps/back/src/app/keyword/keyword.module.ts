import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { KeywordController } from './keyword.controller'
import { KeywordService } from './keyword.service'
import { KeywordSchema } from './schemas/keyword.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Keyword', schema: KeywordSchema }]),
  ],
  controllers: [KeywordController],
  providers: [KeywordService],
  exports: [KeywordService],
})
export class KeywordModule {}
