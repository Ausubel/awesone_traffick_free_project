import Tokenizer from "./tokenizer";

function sendAuthResponse(res: any, statusCode: number, message: string) {
  return res.status(statusCode).json({
    message
  });
}

export function checkAuthToken(userRoleId: number) {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return sendAuthResponse(res, 401, "Authorization token is missing.");
    }

    const token = authorization.split("Bearer ")[1];
    if (!token) {
      return sendAuthResponse(res, 401, "Token is missing in the authorization header.");
    }

    try {
      await Tokenizer.check(token, { userRoleId });
      next();
    } catch (err) {
      return sendAuthResponse(res, 401, "Invalid or expired token.");
    }
  };
}