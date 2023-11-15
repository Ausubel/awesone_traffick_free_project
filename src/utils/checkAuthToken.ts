import Tokenizer from "./tokenizer";


export function checkAuthToken(userRoleId) {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        };
        const token = authorization.split("Bearer ")[1];
        if (!token){
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
        try {
            await Tokenizer.check(token, { 
                userRoleId
            });
            next();
        } catch (err) {
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
    }
    
}