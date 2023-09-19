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
import { SubcategoryDTO } from './dto/subcategory.dto'
import { SubcategoryService } from './subcategory.service'

@Controller('subcategories')
export class SubcategoryController {
  constructor(private subcategoryService: SubcategoryService) {}

  @Get()
  async find(@Res() res) {
    const categories = await this.subcategoryService.find({})
    return res.status(HttpStatus.OK).json(categories.sort(sortByTitle))
  }

  @Get('/:_id')
  async findById(@Res() res, @Param('_id', new ValidateObjectId()) _id) {
    const subcategory = await this.subcategoryService.findById(_id)
    if (!subcategory) throw new NotFoundException('Subcategory does not exist!')
    return res.status(HttpStatus.OK).json(subcategory)
  }

  @Post('/add')
  async add(@Res() res, @Body() subcategoryDTO: SubcategoryDTO) {
    const subcategory = await this.subcategoryService.add(subcategoryDTO)
    return res.status(HttpStatus.OK).json({
      message: 'success',
      subcategory,
    })
  }

  @Put(':_id/update')
  async findByIdAndUpdate(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id,
    @Body() subcategoryDTO: SubcategoryDTO & { _id: string }
  ) {
    const subcategory = await this.subcategoryService.findByIdAndUpdate(
      _id,
      subcategoryDTO
    )
    if (!subcategory) throw new NotFoundException('Subcategory does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      subcategory,
    })
  }

  @Delete(':_id/delete')
  async findByIdAndRemove(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id
  ) {
    const subcategory = await this.subcategoryService.findByIdAndRemove(_id)
    if (!subcategory) throw new NotFoundException('Subcategory does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      subcategory: subcategory,
    })
  }
}
