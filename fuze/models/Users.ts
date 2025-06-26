import {Realm, BSON, ObjectSchema} from 'realm';

export class Users extends Realm.Object<Users> {
  _id: BSON.ObjectId = new BSON.ObjectID();
  name!: string;
  email!: string;
  password!: string;

  static primaryKey= '_id';
}
