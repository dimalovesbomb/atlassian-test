const HttpService = require('./src/HttpService.js');
const SecretsManager = require('./src/SecretsManager.js');

exports.handler = async (event) => {
    try {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const apiValue = await SecretsManager.getSecret("arn:aws:secretsmanager:us-east-1:043776714664:secret:atlassian/weather/test-EhLGcS", "us-east-1");
        const appId = JSON.parse(apiValue).APP_ID;
        const weatherResponse = await HttpService.requestGET(url, {q: event["queryStringParameters"]['city'], appId, units: 'metric'});

        return weatherResponse;
    } catch (error) {
        return  error;
    }
};