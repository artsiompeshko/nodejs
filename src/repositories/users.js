import User from '../models/user';
import generateId from '../helpers/id-generator';

const users = [];
const nextId = generateId();

// initial state
users.push(new User({
  id: nextId(),
  login: 'Artsiom',
  password: 'Artsiom123',
}));

const addUser = ({ login = 'Unknown', password }) => {
  users.push(new User({
    id: nextId(),
    login,
    password,
  }));
};

const getUserById = queryId => users.filter(({ id }) => id === queryId)[0];
const getUserByLogin = queryLogin => users.filter(({ login }) => login === queryLogin)[0];
const getUsers = () => users;

export default {
  addUser,
  getUserById,
  getUsers,
  getUserByLogin,
};
