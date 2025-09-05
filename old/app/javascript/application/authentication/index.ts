import Cookies from "js-cookie";

const TOKEN = "technology-watch-token";
const CLIENT = "technology-watch-client";
const UID = "technology-watch-UID";

export function getToken() : string | undefined {
  return Cookies.get(TOKEN);
}

export function setToken(token: string, expires: number = 7) : void {
  Cookies.set(TOKEN, token, { expires });
}

export function getUID() : string | undefined {
  return Cookies.get(UID);
}

export function setUID(uid: string, expires: number = 7) : void {
  Cookies.set(UID, uid, { expires });
}

export function getClient() : string | undefined {
  return Cookies.get(CLIENT);
}

export function setClient(client: string, expires: number = 7) : void {
  Cookies.set(CLIENT, client, { expires });
}

export function clear() {
  Cookies.remove(TOKEN);
  Cookies.remove(UID);
  Cookies.remove(CLIENT);
}
