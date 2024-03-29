import {openDatabase} from "react-native-sqlite-storage";

const db = openDatabase({
    name: "test_db",
    location: "default"
})

export default db