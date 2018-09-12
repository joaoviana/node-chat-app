const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;


  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Joao',
      room: 'pokemon'
    },{
      id: '2',
      name: 'Jane',
      room: 'digimon'
    },{
      id: '3',
      name: 'Jenny',
      room: 'pokemon'
    }]
  });

    it ('should add new user ', () => {
      var users = new Users();
      var user = {
        id: '123',
        name: 'Joao',
        room: 'Random room'
      };
      var responseUser = users.addUser(user.id, user.name,user.room);

      expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);

    });

    it('should not remove user', () => {
      var userId = '99';
      var user = users.removeUser(userId);

      expect(user).toNotExist();
      expect(users.users.length).toBe(3);

    });

    it('should find user', () => {
      var userId = '2';
      var user = users.getUser(userId);
      expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
      var userId = '99';
      var user = users.getUser(userId);
      expect(user).toNotExist();
    });

    it('should return names for pokemon', () => {
      var userList = users.getUserList('pokemon');

      expect(userList).toEqual(['Joao', 'Jenny']);
    })

    it('should return names for digimon', () => {
      var userList = users.getUserList('digimon');

      expect(userList).toEqual(['Jane']);
    })
});
