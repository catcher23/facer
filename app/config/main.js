module.exports = {
    database: process.env.MONGO_DB_URI,
    port: process.env.PORT || 3000,
    secret: process.env.SECRET_JWT_KEY
};
