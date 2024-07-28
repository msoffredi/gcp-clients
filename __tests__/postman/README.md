# API Postman collection

In this folder you can find a Postman (version 9.3.1+) collection with test requests for all API endpoints including authentication. Import the provided collection into your Postman application in order to use it for testing purposes. This collection is fully functional for both local and cloud endpoints testing (with proper configuration, see below).

## Dependencies

In order to use the provided Postman collection you will need to create one environment variable with the name `ms-user-url` and assign it your local API base URL. For exammple `http://127.0.0.1:3000`. By using environments you can assign different values to each environment and test the API locally and in AWS (staging and production if you have both).

## Authentication

Authentication has been configured to be set in the collection directory and automatically inherited by all endpoints needing it. So no specially configuration is needed on each endpoint. In order to configure authentication on your collection, you will need an authentication token (see main project [documentation](https://github.com/msoffredi/ms-auth/blob/main/README.md)), and then click on the collection folder in Postman, and in the Authorization tab paste your token in the Token field.

## Testing endpoints with URL parameters

Some endpoints will have URL parameters to specify for example which object you want to retrieve or delete (by ID). This has to be specified by using URL parameters in Postman. You can find this on each collection request under the Params tab.

## Testing endpoints with body parameters

Some endpoints (POST endpoints for example) will have body parameters as a JSON object sent to be processed. In those cases you will find the object in the corresponding collection requests under the Body tab.
