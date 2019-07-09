const RGX_EMAIL = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
const RGX_UNAME = /^[a-z0-9_-]$/;

export function email_be_a_valid_email_address(email) {
  return RGX_EMAIL.test(email);
}

export function username_only_contain_letters_digits_underline_and_dash_characters(
  uname
) {
  return RGX_UNAME.test(uname);
}
export function username_be_at_least_1_and_at_most_30_characters(uname) {
  return uname.length >= 1 && uname.length <= 30;
}

export function password_be_at_least_8_and_at_most_50_characters(pwd) {
  return pwd.length >= 8 && pwd.length <= 50;
}
