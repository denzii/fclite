// initially only shareholder id and name will be set on this to populate a list
// later on when the individual person is selected, a new query for fetching everything will be made
// which is why only the id and name are mandatory

import { LegacyRef, MutableRefObject } from "react";

export default class Shareholder{
    id: number;
    name: string;
    movieId?: number;
    iban?: string;
    address?: string;
    balance?: number;
    // domRef?: LegacyRef<HTMLElement>;

    constructor(id: number, name: string, iban?: string, address?: string, balance?:number, domRef?: LegacyRef<HTMLElement>){
        this.id = id;
        this.name = name;
        this.iban = iban;
        this.address = address;
        this.balance = balance;
        // this.domRef = domRef;
    }
}