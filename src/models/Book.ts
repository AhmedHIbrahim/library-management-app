import { Model, DataTypes, Sequelize, Association, NOW } from "sequelize";
import Borrow from "./Borrow";

class Book extends Model {
  public id!: number;
  public name!: string;
  public averageScore!: number;

  static initialize(sequelize: Sequelize) {
    Book.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        averageScore: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0,
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
        tableName: "books",
      }
    );
  }

  public readonly borrows?: Borrow[];

  public static associations: {
    borrows: Association<Book, Borrow>;
  };

  static associate() {
    Book.hasMany(Borrow, { foreignKey: "bookId", as: "borrows" });
  }
}

export default Book;
