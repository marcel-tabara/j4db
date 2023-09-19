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
import { KeywordDTO } from './dto/keyword.dto'
import { KeywordService } from './keyword.service'

@Controller('keywords')
export class KeywordController {
  constructor(private keywordService: KeywordService) {}

  @Get()
  async find(@Res() res) {
    const keywords = await this.keywordService.find({})
    return res.status(HttpStatus.OK).json(keywords.sort(sortByTitle))
  }

  @Get('/:_id/byArticle')
  async findByArticleLink(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id
  ) {
    const keywords = await this.keywordService.find({ article: _id })
    return res.status(HttpStatus.OK).json(keywords.sort(sortByTitle))
  }

  @Get('/:_id')
  async findById(@Res() res, @Param('_id', new ValidateObjectId()) _id) {
    const keyword = await this.keywordService.findById(_id)
    if (!keyword) throw new NotFoundException('Keyword does not exist!')
    return res.status(HttpStatus.OK).json(keyword)
  }

  @Post('/add')
  async add(@Res() res, @Body() keywordDTO: KeywordDTO) {
    const keyword = await this.keywordService.add(keywordDTO)
    return res.status(HttpStatus.OK).json({
      message: 'success',
      keyword,
    })
  }

  @Put(':_id/update')
  async findByIdAndUpdate(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id,
    @Body() keywordDTO: KeywordDTO & { _id: string }
  ) {
    const keyword = await this.keywordService.findByIdAndUpdate(_id, keywordDTO)
    if (!keyword) throw new NotFoundException('Keyword does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      keyword,
    })
  }

  @Delete(':_id/delete')
  async findByIdAndRemove(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id
  ) {
    const keyword = await this.keywordService.findByIdAndRemove(_id)
    if (!keyword) throw new NotFoundException('Keyword does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      keyword,
    })
  }

  @Delete(':_id/deleteByArticleId')
  async findByArticleIdAndRemove(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id
  ) {
    const keyword = await this.keywordService.remove({ article: _id })
    if (!keyword) throw new NotFoundException('Keyword does not exist!')
    return res.status(HttpStatus.OK).json({
      message: 'success',
      keyword,
    })
  }

  @Post('/extractKeywords')
  async extractKeywords(
    @Res() res,
    @Body() article: { _id: string; url: string; text: string }
  ) {
    const extractedKeywords = await this.keywordService.extractKeywords({
      _id: article._id,
      url: article.url,
      text: article.text,
    })
    return res.status(HttpStatus.OK).json(extractedKeywords)
  }
}
