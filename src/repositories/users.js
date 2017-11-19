import { User } from '../../models';

const addUser = async ({ login = 'Unknown', password }) => User.create({
  login,
  password,
});

const getUserById = async id => User.findById(id);
const getUserByLogin = async login => User.findOne({
  where: {
    login,
  },
});

const getUsers = async () => User.findAll();

export default {
  addUser,
  getUserById,
  getUsers,
  getUserByLogin,
};
