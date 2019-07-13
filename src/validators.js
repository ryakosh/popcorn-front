const RGX_EMAIL = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
const RGX_UNAME = /^[a-z0-9_-]+$/;

export function isEmailValid(email) {
  return RGX_EMAIL.test(email);
}

export function hasUnameValidChars(uname) {
  return RGX_UNAME.test(uname);
}
export function hasUnameValidLen(uname) {
  return uname.length >= 1 && uname.length <= 30;
}

export function hasPwdValidLen(pwd) {
  return pwd.length >= 8 && pwd.length <= 50;
}
