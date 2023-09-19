import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppSchema } from './schemas/app.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'App', schema: AppSchema }])],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppsModule {}
