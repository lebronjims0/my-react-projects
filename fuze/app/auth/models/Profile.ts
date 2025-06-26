import {Realm, BSON, ObjectSchema} from 'realm';

export class Profile extends Realm.Object<Profile> {
  _id: BSON.ObjectId = new BSON.ObjectID();
  tag!: string;
  realName!: string;
  country!: string;
  age!: string;
  game!: string;
  
  static primaryKey= '_id';
}

