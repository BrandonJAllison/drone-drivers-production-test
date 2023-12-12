const AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log('AWS SDK version:', AWS.VERSION);
    return event;
};