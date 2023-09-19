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
  Query,
  Res,
} from '@nestjs/common';
import { sortByTitle } from '../shared/pipes/utils';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { ArticleService } from './article.service';
import { ArticleDTO } from './dto/article.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  async findPaginated(@Res() res, @Query() paginationQuery: PaginationDto) {
    const { limit, skip } = paginationQuery;
    const data = await this.articleService.find(paginationQuery, {});
    return res
      .status(HttpStatus.OK)
      .json({ limit, skip, total: data.length, data: data.sort(sortByTitle) });
  }

  @Get('/generateArticles')
  async generate(@Res() res) {
    const data = await this.articleService.generateArticles();
    return res.status(HttpStatus.OK).json({ data });
  }

  @Get('/:_id')
  async findById(@Res() res, @Param('_id', new ValidateObjectId()) _id) {
    const article = await this.articleService.findById(_id);
    return article
      ? res.status(HttpStatus.OK).json(article)
      : res.status(HttpStatus.NOT_FOUND);
  }

  @Post('/generateContentByApp')
  async generateContentByApp(@Res() res, @Body() app: { _id: string }) {
    const result = await this.articleService.generateContentByApp(app._id);
    return res.status(HttpStatus.OK).json({
      message: result,
    });
  }

  @Post('/add')
  async create(@Res() res, @Body() articleDTO: ArticleDTO) {
    const article = await this.articleService.create(articleDTO);
    return res.status(HttpStatus.OK).json({
      //message: 'success',
      article,
    });
  }

  @Put(':_id/update')
  async findByIdAndUpdate(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id,
    @Body() articleDTO: ArticleDTO & { _id: string }
  ) {
    const article = await this.articleService.findByIdAndUpdate(
      _id,
      articleDTO
    );
    if (!article) throw new NotFoundException('Article does not exist!');
    return res.status(HttpStatus.OK).json({
      //message: 'success',
      article,
    });
  }

  @Delete(':_id/delete')
  async findByIdAndRemove(
    @Res() res,
    @Param('_id', new ValidateObjectId()) _id
  ) {
    const article = await this.articleService.findByIdAndRemove(_id);
    if (!article) throw new NotFoundException('Article does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'success',
      article,
    });
  }
}
