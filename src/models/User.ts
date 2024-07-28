import { Model, DataTypes, Sequelize, Association, Op } from "sequelize";
import Book from "./Book";
import Borrow from "./Borrow";

class User extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  public readonly pastBorrows?: Borrow[];
  public readonly presentBorrows?: Borrow[];

  public static associations: {
    pastBorrows: Association<User, Borrow>;
    presentBorrows: Association<User, Borrow>;
  };

  static initialize(sequelize: Sequelize) {
    User.init(
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
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }

  static associate() {
    User.hasMany(Borrow, {
      foreignKey: "userId",
      as: "past",
      scope: {
        returnDate: { [Op.ne]: null },
      },
    });

    User.hasMany(Borrow, {
      foreignKey: "userId",
      as: "present",
      scope: {
        returnDate: null,
      },
    });
  }
}

export default User;
