# Cognito Postman Templates Generator

## Overview

AWS Cognito provides a REST interface for authenticating and generating tokens for its user pools.  This project allows a user to easily configure and generate Postman collections to easily request tokens from a Cognito user pool.

Upcoming features will include:
* A CLI to generate configuration
* A CLI to run generation with flags for workspace, config location

## Getting started

* Clone this repository.
* Ensure you have NodeJS and NPM installed.
* Run `npm install` to download the necessary libraries.
* Make a configuration file called `config/config.json`. You can use `config/example-config.json` to help you scaffold this out.

## Running

Once you have a configuration file set up, run `npm run generate` and your Postman collections will be saved to `collections/`.

## Configuration

The example configuration looks like:

```json
{
    "collections": [
        {
            "collectionName": "Example Collection",
            "description": "Tests using test pool on AWS dev instance",
            "credentials": {
                "clientId": "<cognito-app-client-id>",
                "clientSecret": "<cognito-app-client-secret>",
                "scopes": "<cognito-app-client-scopes>",
                "domain": "<cognito-app-client-domain>"
            },
            "code": {
                "clientId": "<cognito-app-client-id>",
                "clientSecret": "<cognito-app-client-secret>",
                "redirectUri": "<cognito-app-client-callback>",
                "domain": "<cognito-app-client-domain>"
            },
            "refresh": {
                "clientId": "<cognito-app-client-id>",
                "clientSecret": "<cognito-app-client-secret>",
                "domain": "<cognito-app-client-domain>"
            }
        }
    ]
}
```

* `collections`: An array of collections which will generate files based on each configuration
    * `collectionName`: The name of this collection.  Spaces and other invalid characters will be replaced and .json will be appended.
    * `description`: Description of the collection.
    * `credentials`: Configuration for the client credentials /token endpoint. See https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
    * `code`: Configuration for the authorization code /token endpoint. See https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
    * `refresh`: Configuration for the refresh token /token endpoint. See https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html

## Endpoints

### /token (Request Token - Client Credentials)
### /token (Request Token - Code)
### /token (Request Token - Refresh Token)

## Copyright
MIT (c) 2018 Cedrus, LLC.