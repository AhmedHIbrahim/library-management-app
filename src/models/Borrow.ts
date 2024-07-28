import { Model, DataTypes, Sequelize, Association, NOW } from "sequelize";
import User from "./User";
import Book from "./Book";

class Borrow extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public borrowDate!: Date;
  public returnDate!: Date | null;
  public score!: number | null;
  // Associations
  public readonly user?: User;
  public readonly book?: Book;

  public static associations: {
    user: Association<Borrow, User>;
    book: Association<Borrow, Book>;
  };

  static initialize(sequelize: Sequelize) {
    Borrow.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bookId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        borrowDate: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        returnDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        score: {
          type: DataTypes.INTEGER,
          allowNull: true,
          validate: {
            min: 1,
            max: 10,
          },
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: NOW,
        },
      },
      {
        sequelize,
        tableName: "borrows",
      }
    );
  }

  static associate() {
    Borrow.belongsTo(User, { foreignKey: "userId", as: "user" });
    Borrow.belongsTo(Book, { foreignKey: "bookId", as: "book" });
  }
}

export default Borrow;
