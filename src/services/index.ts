import Cookies from "js-cookie";

export const BASE_URL = "http://inkognito.herokuapp.com/api/v1";

class Auth {
  getCipher() {
    return Cookies.get("inkognito_admin_cipher");
  }

  setCipher(token: string) {
    Cookies.set("inkognito_admin_cipher", token);
  }

  clearCipher() {
    Cookies.remove("inkognito_admin_cipher");
  }
}

export default new Auth();
