import {initializeApp} from "@firebase/app";
import {CONFIG} from "~/config";
import {getAuth} from "@firebase/auth";

const app = initializeApp(CONFIG.firebaseConfig);

const auth = getAuth(app)

export {auth}