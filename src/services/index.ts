import Cookies from "js-cookie";

export const BASE_URL = "https://inkognito.herokuapp.com/api/v1";
// export const BASE_URL = "http://localhost:5000/api/v1";

class Auth {
  getCipher(): any {
    return Cookies.get("inkognito_admin_cipher");
  }

  setCipher(token: string): void {
    Cookies.set("inkognito_admin_cipher", token);
  }

  clearCipher(): void {
    Cookies.remove("inkognito_admin_cipher");
  }
}

export default new Auth();
