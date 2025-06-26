import {Realm, BSON, ObjectSchema} from 'realm';

export class Users extends Realm.Object<Users> {
  userId: BSON.ObjectId = new BSON.ObjectID();
  name!: string;
  email!: string;
  password!: string;
  createdAt: Date = new Date();
  static primaryKey= 'userId';
}

export default Users;