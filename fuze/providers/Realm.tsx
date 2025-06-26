import { PropsWithChildren } from "react";
import Realm from "realm";
import { RealmProvider } from "@realm/react";
import { Users } from "../models/Users";

export default function RealmCustomProvider({ children }: PropsWithChildren){
    return <RealmProvider schema={[Users]}>{children}</RealmProvider>
}