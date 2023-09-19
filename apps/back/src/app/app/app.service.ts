import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AppDTO } from './dto/app.dto'
import { App } from './interfaces/app.interface'

@Injectable()
export class AppService {
  constructor(@InjectModel('App') private readonly appModel: Model<App>) {}

  find = async (query): Promise<App[]> => {
    Logger.log(`AppService: Find apps ${JSON.stringify(query, null, 2)}.`)
    return await this.appModel.find().exec()
  }

  findById = async (_id): Promise<App> => {
    Logger.log(`AppService: Find app by id ${_id}.`)
    return await this.appModel.findById(_id).exec()
  }

  add = async (appDTO: AppDTO): Promise<App> => {
    Logger.log(`AppService: Add app.`)
    const newApp = await new this.appModel(appDTO)
    return newApp.save()
  }

  findByIdAndUpdate = async (_id: string, appDTO: AppDTO): Promise<App> => {
    Logger.log(`AppService: Find app by id ${_id} and update.`)
    return await this.appModel.findByIdAndUpdate(_id, appDTO, {
      new: true,
    })
  }

  findByIdAndRemove = async (_id): Promise<unknown> => {
    Logger.log(`AppService: Find app by id ${_id} and remove.`)
    return await this.appModel.findByIdAndRemove(_id)
  }
}
