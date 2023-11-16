import jwt from "jsonwebtoken";

export default class Tokenizer {
  static JWT_SECRET_WORD;
  static JWT_EXPIRES_IN;
  static init() {
    this.JWT_SECRET_WORD = process.env.JWT_SECRET_WORD;
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
  }
  static create(payload) {
    return new Promise((res, rej) => {
      jwt.sign(
        { userRoleId: payload.userRoleId },
        this.JWT_SECRET_WORD,
        { expiresIn: this.JWT_EXPIRES_IN },
        (err, token) => {
          if (err) { rej(err); return; }
          res(token);
        }
      );
    });
  }
  static isValidClaims(decoded, { userRoleId }) {
    return decoded.userRoleId === userRoleId;
  }
  static check(token, payloadToVerify) {
    return new Promise((res, rej) => {
      jwt.verify(token, this.JWT_SECRET_WORD, (err, decoded) => {
        if (err) { rej(err); return; }
        if (!this.isValidClaims(decoded, payloadToVerify)) rej("invalid claims");
        res(decoded);
      });
    })
  }
}