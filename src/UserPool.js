import {CognitoUserPool} from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: 'us-east-1_pang8YvSR',
    ClientId: '2uo368cpo2u9uqhc8n9vn5n0o8',
}

export default new CognitoUserPool(poolData)