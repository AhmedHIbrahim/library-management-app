import { Sequelize } from "sequelize";
import { models } from "../config/database";
const { User, Book, Borrow } = models;

export const getAllUsers = async () => {
  return User.findAll();
};

export const getUserById = async (id: number) => {
  return User.findByPk(id, {
    include: [
      {
        model: Borrow,
        as: "past",
        include: [
          {
            model: Book,
            as: "book",
            attributes: [],
          },
        ],
        attributes: [
          ["score", 'userScore'],
          [Sequelize.literal("`past->book`.`name`"), "name"],
        ],
      },
      {
        model: Borrow,
        as: "present",
        include: [
          {
            model: Book,
            as: "book",
            attributes: [],
          },
        ],
        attributes: [
          ["score", 'userScore'],
          [Sequelize.literal("`present->book`.`name`"), "name"],
        ],
      },
    ],
    attributes: ["id", "name"],
  });
};


export const createUser = async (userData: { name: string }) => {
  return User.create(userData);
};
