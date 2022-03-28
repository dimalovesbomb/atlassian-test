const AWS = require('aws-sdk');

class SecretsManager {
    /**
     * Uses AWS Secrets Manager to retrieve a secret
     */
    static async getSecret (secretName, region){
        let secretsManager = new AWS.SecretsManager({
            region: region
        });
        let secret, decodedBinarySecret;

        try {
            let secretValue = await secretsManager.getSecretValue({SecretId: secretName}).promise();
            if ('SecretString' in secretValue) {
                secret = secretValue.SecretString;
                return secret;
            } else {
                let buff = new Buffer(secretValue.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
                return decodedBinarySecret;
            }
        } catch (err) {
            if (err.code === 'DecryptionFailureException')
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                throw err;
            else if (err.code === 'InternalServiceErrorException')
                // An error occurred on the server side.
                throw err;
            else if (err.code === 'InvalidParameterException')
                // You provided an invalid value for a parameter.
                throw err;
            else if (err.code === 'InvalidRequestException')
                // You provided a parameter value that is not valid for the current state of the resource.
                throw err;
            else if (err.code === 'ResourceNotFoundException')
                // We can't find the resource that you asked for.
                throw err;
        }
    }
}

module.exports = SecretsManager;