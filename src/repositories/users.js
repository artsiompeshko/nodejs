import User from '../models/user';
import generateId from '../helpers/id-generator';

const users = [];
const nextId = generateId();

// initial state
users.push(new User({
  id: nextId(),
  name: 'Initial User',
}));

const addUser = ({ name = 'Unknown' }) => {
  users.push(new User({
    id: nextId(),
    name,
  }));
};

const getUser = queryId => users.filter(({ id }) => id === queryId)[0];
const getUsers = () => users;

export default {
  addUser,
  getUser,
  getUsers,
};
