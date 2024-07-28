import { models } from "../config/database";
const { Book } = models;

export const getAllBooks = async () => {
  return Book.findAll();
};

export const getBookById = async (id: number) => {
  return Book.findByPk(id);
};

export const createBook = async (bookData: {
  name: string;
}) => {
  return Book.create(bookData);
};
