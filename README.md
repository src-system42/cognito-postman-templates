# Cognito Postman Templates Generator

## Overview

AWS Cognito provides a REST interface for authenticating and generating tokens for its user pools.  This project allows a user to easily configure and generate Postman collections to easily request tokens from a Cognito user pool.

Using these APIs will require some knowledge of OAUTH2 and authorization flows such as [authorization code grant](https://auth0.com/docs/api-auth/tutorials/authorization-code-grant).

To get a token/code from AWS Cognito, you should direct your web browser to:

*Code (for auth code grant flow)*: `https://<domain>.auth.<region>.amazoncognito.com/login?response_type=code&client_id=<client id>&redirect_uri=<callback>&state=STATE&scope=<scope1+scope2+scope3...>`

Once you have logged-in with the username/password of a user from the pool, you will be redirected to the callback URL with `code` as a query parameter.  You can use this to get tokens.

*Token (for implicit flow)*: `https://<domain>.auth.<region>.amazoncognito.com/login?response_type=token&client_id=<client id>&redirect_uri=<callback>&state=STATE&scope=<scope1+scope2+scope3...>`

Once you have logged-in with the username/password of a user from the pool, you will be redirected to the callback URL with `id_token` as a query parameter which will contain identification information.  You can use the `access_token` parameter for access to resources.

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

[/TOKEN](https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html) - Documentation from AWS site

### /token (Request Token - Client Credentials)

Exchanging Client Credentials for an Access Token

#### Sample Request

```
POST https://mydomain.auth.us-east-1.amazoncognito.com/oauth2/token >
Content-Type='application/x-www-form-urlencoded'&
Authorization=Basic aSdxd892iujendek328uedj

grant_type=client_credentials&
scope={resourceServerIdentifier1}/{scope1} {resourceServerIdentifier2}/{scope2}
```

#### Sample response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
 "access_token":"eyJz9sdfsdfsdfsd", 
 "token_type":"Bearer", 
 "expires_in":3600
}
```

### /token (Request Token - Code)

Exchanging an Authorization Code for Tokens
#### Sample Request
```
POST https://mydomain.auth.us-east-1.amazoncognito.com/oauth2/token&
Content-Type='application/x-www-form-urlencoded'&
Authorization=Basic aSdxd892iujendek328uedj

grant_type=authorization_code&
client_id=djc98u3jiedmi283eu928&
code=AUTHORIZATION_CODE&
redirect_uri=com.myclientapp://myclient/redirect
```

#### Sample response
```
HTTP/1.1 200 OK
Content-Type: application/json

{ 
 "access_token":"eyJz9sdfsdfsdfsd", 
 "refresh_token":"dn43ud8uj32nk2je", 
 "id_token":"dmcxd329ujdmkemkd349r",
 "token_type":"Bearer", 
 "expires_in":3600
}
```
### /token (Request Token - Refresh Token)

Exchanging a Refresh Token for Tokens

#### Sample Request

```
POST https://mydomain.auth.us-east-1.amazoncognito.com/oauth2/token >
Content-Type='application/x-www-form-urlencoded'
Authorization=Basic aSdxd892iujendek328uedj

grant_type=refresh_token&
client_id=djc98u3jiedmi283eu928&
refresh_token=REFRESH_TOKEN
```

#### Sample Response

```
HTTP/1.1 200 OK
Content-Type: application/json

{
 "access_token":"eyJz9sdfsdfsdfsd", 
 "refresh_token":"dn43ud8uj32nk2je", 
 "id_token":"dmcxd329ujdmkemkd349r",
 "token_type":"Bearer", 
 "expires_in":3600
}
```

## Copyright
MIT (c) 2018 Matt Johnson - Cedrus, LLC.