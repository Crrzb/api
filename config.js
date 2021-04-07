module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,

    },
    post: {
        port: process.env.POST_PORT || 3002

    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'ZO703fHiV8',
        password: process.env.MYSQL_PASS || 'X4Wln2XyzC',
        database: process.env.MYSQL_DB || 'ZO703fHiV8',
        
    },
    mysql_service: {
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || 3001,
    },
    cache_service: {
        host: process.env.CACHE_SERVICE_HOST || 'localhost',
        port: process.env.CACHE_SERVICE_PORT || 3003,
    },
    redis: {
        host:process.env.REDIS_HOST || 'redis-17656.c256.us-east-1-2.ec2.cloud.redislabs.com',
        port:process.env.REDIS_PORT || '17656',
        password:process.env.REDIS_PASS || 'j3rSb5eP3WNmjnmU8ElvgsK3M6E8jD0C'
    }


    
};