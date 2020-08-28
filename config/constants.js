module.exports = {

    server: {
        title: 'Lib-Quality',
        port: process.env.PORT || 3000
    },
    http: {
        SUCCESS: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },
    db: {
        uri: process.env.DATABASE || 'mongodb://localhost:27017/libquality',
            options: {
        useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            user: process.env.MONGO_USER || '',
            pass: process.env.MONGO_PASS || ''
        }
    },
    error: {
        INTERNAL_ERROR: {code: 5000, message: "Internal error"},
    },
    CollectorStatus: {
        FINISHED: 'FINISHED',
        COLLECTING: 'COLLECTING'
    },
    COLLECT_PER_PAGE: 100
};
