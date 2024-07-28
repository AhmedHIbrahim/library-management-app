import { Request, Response, NextFunction } from "express";
import * as bookService from "../../services/bookService";

export const listBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = await bookService.getBookById(bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};
