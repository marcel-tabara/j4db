import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'
import { sortByTitle } from '../shared/pipes/utils'
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes'
import { CategoryService } from './category.service'
import { CategoryDTO } from './dto/category.dto'

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async find(@Res() res) {
    const categories = await this.categoryService.find({})
    return res.status(HttpStatus.OK).json(categories.sort(sortByTitle))
  }

  @Get('/:_id')
  async findById(@Res() res, @Param('_id', new ValidateObjectId()) _id) {
    const category = await this.categoryService.findById(_id)
    if (!category) throw new NotFoundException('Category does not exist!')
    return res.status(HttpStatus.OK).json(category)
  }

  @Post('/add')
  async add(@Res() res, @Body() categoryDTO: CategoryDTO) {
    const category = await this.categoryService.add(categoryDTO)
    return res.status(HttpStatus.OK).json({
      message: 'success',
      category,
    })
  }

  @Put(':_id/update')
  async findByIdAndUpdate(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id,
    @Body() categoryDTO: CategoryDTO & { _id: string }
  ) {
    const category = await this.categoryService.findByIdAndUpdate(
      _id,
      categoryDTO
    )
    if (!category) throw new NotFoundException('Category does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      category,
    })
  }

  @Delete(':_id/delete')
  async findByIdAndRemove(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id
  ) {
    const category = await this.categoryService.findByIdAndRemove(_id)
    if (!category) throw new NotFoundException('Category does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      category: category,
    })
  }
}
