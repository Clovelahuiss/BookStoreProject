import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './create-author.dto';
import { UpdateAuthorDto } from './update-author.dto';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async findAllAuthors(@Query('search') search?: string) {
    return this.authorService.findAllAuthors(search);
  }

  @Get('paginated')
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    return await this.authorService.findAllWithPagination(limit, offset);
  }

  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get(':id')
  async findAuthorById(@Param('id') id: number) {
    return this.authorService.findAuthorById(id);
  }

  @Put(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorService.updateAuthor(Number(id), updateAuthorDto);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(Number(id));
  }
}
