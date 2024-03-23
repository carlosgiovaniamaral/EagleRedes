import * as firebaseAuth from "firebase/auth";
import { auth } from "../FirebaseConfig";

export default class AuthService {
  async login(email: string, password: string) {
    try {
      const user = await firebaseAuth.signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
      return user;
    } catch (error) {
      console.log("error", error);
      return await Promise.reject(error);
    }
  }
}
