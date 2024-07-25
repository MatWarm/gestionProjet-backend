

// middleware/myMiddleware.js
const middleware = (req, res, next) => {
    console.log(`Requête reçue : ${req.method} ${req.url}`);
    if (req.url !== '/compte/login' && req.url !== '/compte/') {
        var token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        }
    }
    next();
};


module.exports = middleware;
