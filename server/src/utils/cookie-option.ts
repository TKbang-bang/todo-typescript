import { CookieOptions } from "../types/cookie";

const cookieOption: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

export default cookieOption;
