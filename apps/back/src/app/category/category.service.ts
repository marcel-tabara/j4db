import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CategoryDTO } from './dto/category.dto'
import { Category } from './interfaces/category.interface'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>
  ) {}

  find = async (query): Promise<Category[]> => {
    Logger.log(
      `CategoryService: Find categories ${JSON.stringify(query, null, 2)}.`
    )
    return await this.categoryModel.find(query).populate({
      path: 'app',
      select: '_id, title',
      strictPopulate: false,
    })
  }

  findById = async (_id): Promise<Category> => {
    Logger.log(`CategoryService: Find category by id ${_id}.`)
    return await this.categoryModel
      .findOne({ _id })
      .populate({
        path: 'app',
        select: '_id, title',
        strictPopulate: false,
      })
      .exec()
  }

  add = async (categoryDTO: CategoryDTO): Promise<Category> => {
    Logger.log(`CategoryService: Add category.`)
    const category = await new this.categoryModel(categoryDTO)
    return category.save()
  }

  findByIdAndUpdate = async (
    _id: string,
    categoryDTO: CategoryDTO & { _id: string }
  ): Promise<Category> => {
    Logger.log(`CategoryService: FindByIdAndUpdate ${_id}.`)
    const newCat = await this.categoryModel.findByIdAndUpdate(
      _id,
      categoryDTO,
      {
        new: true,
      }
    )
    return newCat
  }

  async findByIdAndRemove(_id): Promise<unknown> {
    Logger.log(`CategoryService: FindByIdAndRemove ${_id}.`)
    return await this.categoryModel.findByIdAndRemove(_id)
  }
}
