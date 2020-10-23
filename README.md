# Streamcards API
A [Streamloots](https://www.streamloots.com/) clone API, developed in [nodejs](https://nodejs.org/es/) and [expressjs](https://expressjs.com/es/) for testing and knowledge showcasing purposes.

<p align="center">
  <img src="https://user-images.githubusercontent.com/2803925/96896740-2a265980-148e-11eb-88b2-0bcc0071af1e.png" width="40%" style="display: block; margin: 0 auto; text-align: center">
</p>

## Main Features
### Techs
- 🟩 [nodejs](https://nodejs.org/)
- 🏢 [expressjs](https://expressjs.com/es/)
- 💾 [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- 🔐 [JWT](https://mongoosejs.com/) (JSON Web Tokens)
- 💉 [TSyringe](https://github.com/microsoft/tsyringe)
- 🟨 [dotenv](https://www.npmjs.com/package/dotenv)
- ⭐ [event-dispatch](https://www.npmjs.com/package/event-dispatch)

## Architecture
### Patterns
This API architecture is Based on a **MVVM pattern** using **services + repositories** for all the business logic, and following **SOLID** and **Clean** principles, turning it into a highly scalable API.

Using repositories, not only we separate the business logic from the express router controller layers, but also API calls are agnostic of the data source, because the repository controls the data access calls and event triggering from behind express calls. This way, the API follows the single responsibility and separation of concerns principles.

### Dependency Inversion & Injection
All service layers are **abstracted** via interfaces, so the repository is at the same time agnostic of the technologies used in the services, and services are all easily replaceable by other technologies in the future.

**Dependency Injection** is handled via **TSyringe**, injecting services into the repository, and the repository itself into the express router controllers. This way, layer are accesible via single instances of these controllers or **singletons**, saving resources.

### Loaders
Following a similar pattern to **W3Tech Microframework**, the server startup process is split into isolated and testable modules, and moved away from the ***app.ts*** or main entry point.

Every module is initialized inside its own submodule, isolating them inside "loaders" folder / module, where its index.ts loads all the required submodules, and this is imported at the same time in ***app.ts***

**Separation of concerns** and **Single Responsability** compliant.

### Event emitters and subscribers
Instead of nesting multiple service calls into the repositories, Analytics, Push Notifications and external service calls are handled via event-dispatch pattern.

For example, every time a card is created or published an event is dispatched. Subscribers catch these events and act calling external services or anything else required.

### Configuration and sensitive info
Configuration is handled via a central config/index.ts, where all variables are accesible via an exported class.

Sensitive data like passwords and database URL is handled via **dotenv** and **environment variables** using a **.env** file. This file should never be commited to a production repository, and just be replaced by an example file for showing purposes. As this is just a test API for showcasing purposes, this is ignored and .env file is uploaded in this same repository.

### Basic Auth
Auth is handled via JWT or JSON Web Tokens, and easy way of transfering auth data between API and clients using tokens signed with a secret.

A **JWT** can be deciphered and its info accesed without the secret, but a client can't sign a token without the secret, not being able of faking it. This makes the auth verifying process secure as long as we don't store sensitive data inside the token, what we don't.

At this initial state the API doesn't have a SignIn endpoint able to generate a jwt token, so we use the official [JWT Debugger](https://jwt.io/) for creating test tokens.

![jwt-debugger](https://user-images.githubusercontent.com/2803925/96904343-45499700-1497-11eb-8426-f7c87d62e0d8.png)

### Data
Data is stored in **MongoDB** documents, and handled via **Mongoose** Models. These models are also abstracted in interfaces so services and repositories don't depend on MongoDB implementations.

### Routing
API endpoints and routes are handled via express controllers (./api/routes). Every part of the API is contained into its own route file.

Express controllers also follow the single responsibility principle, only containing data parsing and repository calls.

## Usage
### Run
1. Install dependencies:
```
npm install
```
2. Run server:
    - Dev
    ```
    npm run dev
    ```
    - Prod
    ```
    npm run prod
    ```

### Compile (Transpile)
Output is located in *./build*
```
npm run tsc
```

### Sample calls
You can test the API importing the [API sample calls collection](https://github.com/IsaacRF/streamcards-api/blob/main/call-examples/streamcards-api.postman_collection.json) to **Postman**. This collection contains sample data and required arguments for every route.

### Endpoints
All endpoints and detailed parameters are documented [here](https://documenter.getpostman.com/view/11626220/TVYDeKbL)

API default route is http://localhost:3000/api

- Create Card -> [***POST***] http://localhost:3000/api/cards
- Get Card by ID -> [***GET***] http://localhost:3000/api/cards/-cardID-
- Get Cards by Owner -> [***GET***] http://localhost:3000/api/cards/owner/-ownerID-
    - Params
        - cardsPerPage = -Defaults to 10-
        - lastCardId = Used for pagination. First page if null
- Update Card Info -> [***PUT***] http://localhost:3000/api/cards
- Delete Card -> [***DELETE***] http://localhost:3000/api/cards
- Bulk Publish Cards -> [***PATCH***] http://localhost:3000/api/cards/publish
- Bulk Unpublish Cards -> [***PATCH***] http://localhost:3000/api/cards/unpublish

This JWT token can be used for auth (Auth = Bearer Token):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhkYjI2YTRhNjYyOTU3OTk1NjAxODIiLCJuYW1lIjoiVGVzdCAxIn0.6pUeKaVtL-4k5Y8E7BsnN3t2C_GYCXe5zChA4ez5DDc
```

## TODO
- [ ] API needs a SignIn endpoint to generate the jwt auth token
- [ ] Auth has no "isOwner" check on card operations. Need to prevent impersonations
- [ ] Dockerize API