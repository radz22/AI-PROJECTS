import { atom } from "jotai";
import { userDataType } from "../types/user-data-type";
export const userAtom = atom<userDataType | null>(null);
