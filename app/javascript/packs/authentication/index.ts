import Cookies from 'js-cookie';

const TOKEN = "technology-watch-token";

export function getToken() : string {
  return localStorage.getItem(TOKEN) || "";
}

export function setToken(token: string, expires: number = 7) : void {
  Cookies.set(TOKEN, token, { expires });
}