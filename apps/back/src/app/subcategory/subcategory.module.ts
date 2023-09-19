import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SubcategorySchema } from './schemas/subcategory.schema'
import { SubcategoryController } from './subcategory.controller'
import { SubcategoryService } from './subcategory.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Subcategory', schema: SubcategorySchema },
    ]),
  ],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
