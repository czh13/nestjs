import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { UpdateBookDto } from './dto/update-book.dto';
import type { CreateBookDto } from './dto/create-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject(DbService)
  private dbService: DbService;

  async list() {
    const books: Book[] = await this.dbService.read();
    return books;
  }
  async findById(id: number) {
    const books: Book[] = await this.dbService.read();
    return books.find((book) => book.id === id);
  }
  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();
    const book = new Book();
    book.id = randomNum();
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;
    books.push(book);
    await this.dbService.write(books);
    return book;
  }
  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const foundBook = books.find((book) => book.id === updateBookDto.id);
    if (!foundBook) {
      throw new BadRequestException('该图书不存在');
    }
    foundBook.name = updateBookDto.name;
    foundBook.author = updateBookDto.author;
    foundBook.description = updateBookDto.description;
    foundBook.cover = updateBookDto.cover;
    await this.dbService.write(books);
    return foundBook;
  }
  async delete(id: number) {
    const books: Book[] = await this.dbService.read();
    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books.splice(index, 1);
      await this.dbService.write(books);
    }
    return {
      message: '删除成功',
    };
  }
}
