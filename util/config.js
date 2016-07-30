const config = {
    dbUrl:"mongodb://localhost:27017/stories",
    port: process.env.PORT || 3000,
    secretKey : "123456789",
    email : {
        provider:"Gmail",
        userName : "user@gmail.com",
        key : "12345678"
    }
}

export default config;