/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AuthorService } from '../service/author.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorPresenter } from '../presenter/author.presenter';


@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<AuthorPresenter> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get()
  async findAllAuthors(): Promise<AuthorPresenter[]> {
    return this.authorService.findAllAuthors();
  }

  @Get(':id')
  async findAuthorById(@Param('id') id: string): Promise<AuthorPresenter> {
    return this.authorService.findAuthorById(Number(id));
  }

  @Put(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorPresenter> {
    return this.authorService.updateAuthor(Number(id), updateAuthorDto);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<void> {
    return this.authorService.deleteAuthor(Number(id));
  }
}
