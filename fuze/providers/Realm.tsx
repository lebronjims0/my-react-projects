import { PropsWithChildren } from "react";
import Realm from "realm";
import { RealmProvider } from "@realm/react";
import { Users } from "../app/auth/models/Users";
import { Profile } from "../app/auth/models/Profile";

export default function RealmCustomProvider({ children }: PropsWithChildren){
    return <RealmProvider schema={[Users]}>{children}</RealmProvider>
}