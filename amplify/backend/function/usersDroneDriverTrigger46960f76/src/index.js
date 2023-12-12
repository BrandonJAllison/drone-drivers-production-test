const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let date = new Date();

    const params = {
        TableName: DroneDriversUserTable,
        Item: {
            'id': event.request.userAttributes.sub,
            'email': event.request.userAttributes.email,
            'hasPaid': false,
            // other attributes...
        }
    };

    try {
        await ddb.put(params).promise();
        console.log("User added to DynamoDB");
    } catch (err) {
        console.log("Error adding user to DynamoDB", err);
    }

    return event;
};