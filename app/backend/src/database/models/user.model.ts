import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  id!: number; // exclamação depois = not null
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

UserModel.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
  },
  role: {
    type: STRING,
    allowNull: true,
  },
  email: {
    type: STRING,
  },
  password: {
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'UserModel',
  tableName: 'users',
  timestamps: false,
});

export default UserModel;
