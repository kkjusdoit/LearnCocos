import { sys } from "cc";

export class PlayerPreference {
    static setFloat (key: string, value: number) {
        sys.localStorage.setItem(key, value.toString());
    }

    static getFloat (key: string, defaultValue: number) {
        let value = sys.localStorage.getItem(key);
        if (value == null) {
            return defaultValue;
        }
        return Number.parseFloat(value);
    }

    

}