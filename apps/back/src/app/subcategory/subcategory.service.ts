import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SubcategoryDTO } from './dto/subcategory.dto'
import { Subcategory } from './interfaces/subcategory.interface'

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel('Subcategory')
    private readonly subcategoryModel: Model<Subcategory>
  ) {}

  find = async (query): Promise<Subcategory[]> => {
    Logger.log(`SubcategoryService: find ${JSON.stringify(query, null, 2)}`)
    return await this.subcategoryModel.find(query).populate({
      path: 'category',
      select: '_id, slug',
      strictPopulate: false,
    })
  }

  findById = async (_id): Promise<Subcategory> => {
    Logger.log(`SubcategoryService: findById ${_id}`)
    return await this.subcategoryModel
      .findOne({ _id })
      .populate({
        path: 'category',
        select: '_id, slug',
        strictPopulate: false,
      })
      .exec()
  }

  add = async (subcategoryDTO: SubcategoryDTO): Promise<Subcategory> => {
    const subcategory = await new this.subcategoryModel(subcategoryDTO)
    return subcategory.save()
  }

  findByIdAndUpdate = async (
    _id: string,
    subcategoryDTO: SubcategoryDTO & { _id: string }
  ): Promise<Subcategory> => {
    Logger.log(`SubcategoryService: findByIdAndUpdate ${_id}`)
    const newCat = await this.subcategoryModel.findByIdAndUpdate(
      _id,
      subcategoryDTO,
      {
        new: true,
      }
    )

    return newCat
  }

  findByIdAndRemove = async (_id): Promise<unknown> => {
    Logger.log(`SubcategoryService: findByIdAndRemove ${_id}`)
    return await this.subcategoryModel.findByIdAndRemove(_id)
  }
}
