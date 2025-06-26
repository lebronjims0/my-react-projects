import {Realm, BSON, ObjectSchema} from 'realm';

export class Profile extends Realm.Object<Profile> {
  profileId: BSON.ObjectId = new BSON.ObjectID();
  userId!: BSON.ObjectId; // Reference to the user
  tag!: string;
  realName!: string;
  country!: string;
  age!: string;
  game!: string;
  
  static primaryKey= 'profileId';
}

export default Profile;
