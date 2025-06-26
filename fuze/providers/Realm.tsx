import 'react-native-get-random-values';
import { PropsWithChildren } from "react";
import Realm from "realm";
import { RealmProvider } from "@realm/react";
import { Users } from "../app/auth/models/Users";
import { Profile } from "../app/auth/models/Profile";

// Increment this number every time you change your schema
const schemaVersion = 5;

export default function RealmCustomProvider({ children }: PropsWithChildren) {
    return (
        <RealmProvider
            schema={[Users, Profile]}
            schemaVersion={schemaVersion}
        >
            {children}
        </RealmProvider>
    );
}