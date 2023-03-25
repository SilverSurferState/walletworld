import uuid from "react-native-uuid";


export const UUID = GetUUID();

export function GetUUID() {
    try {
        let id = uuid.v4();
        return id;
    } catch (e) {
        console.log(e);
    }
}