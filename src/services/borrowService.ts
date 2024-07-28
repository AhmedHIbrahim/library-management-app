import { Op } from "sequelize";
import { models } from "../config/database";
const { Borrow, Book, User } = models;

export const borrowBook = async (userId: number, bookId: number) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const book = await Book.findByPk(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  const existingBorrow = await Borrow.findOne({
    where: { bookId, returnDate: null },
  });

  if (existingBorrow) {
    throw new Error("Book is already borrowed");
  }

  return Borrow.create({ userId, bookId });
};

export const returnBook = async (
  userId: number,
  bookId: number,
  score: number
) => {
  const borrow = await Borrow.findOne({
    where: { bookId: bookId, userId: userId },
  });

  if (!borrow) {
    throw new Error("Borrow record not found for this user");
  }

  if (borrow.returnDate) {
    throw new Error("Book has already been returned");
  }

  borrow.returnDate = new Date();
  borrow.score = score;
  await borrow.save();

  // Update book's average score
  const book = await Book.findByPk(borrow.bookId);
  if (book) {
    const borrows = await Borrow.findAll({ 
      where: { bookId: book.id, score: { [Op.ne]: null } },
    });
    const totalScore = borrows.reduce((sum, b) => sum + (b.score || 0), 0);
    book.averageScore = totalScore / borrows.length;
    await book.save();
  }

  return borrow;
};

