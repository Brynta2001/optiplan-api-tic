# OptiPlan API

This is the backend of the OptiPlan project, a kanban-based task management web app for enterprises. It is a REST API that provides endpoints to manage projects, tasks, states and also accounts.

## Technologies

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- Docker

## Installation

1. Clone the repository.
2. Install dependencies:

    ```bash
    yarn install
    ```

3. Clone file ```.env.template```, change its name to ```.env```.
4. Fill the environment variables in the ```.env``` file.
5. Start the container with the PostgreSQL database:

    ```bash
    docker-compose up -d
    ```

6. Execute the application:

    ```bash
    yarn start
    ```

## Usage

1. The API is available at the address ```http://localhost:3000```.
2. Initially, the application has no data, so you have to create roles. To facilitate this, the API has an endpoint to create roles. To do this, send a GET request to the endpoint ```/seed/roles```. This will create the following roles:

    - admin
    - business_manager
    - area_manager
    - area_leader
    - technician

3. Additionally, the application has no data about states, so you have to create them. To facilitate this, the API has an endpoint to create states. To do this, send a GET request to the endpoint ```/seed/states```. This will create the following states:

    - New
    - To Do
    - In Progress
    - Done

4. You have to create an account. To do this, send a POST request to the endpoint ```/accounts``` with the following body. Remember that you have to specify the role in the body. The roles are the ones created in step 2.

    ```json
    {
      "email": "maria.rodriguez@epn.edu.ec",
      "password": "@Maria01",
      "fullName": "María Rodriguez",
      "roles": [
        "area_manager"
      ],
      "department": "TI"
    }
    ```

5. You have to log in to get the token. To do this, send a POST request to the endpoint ```/auth/login``` with the following body. Remember that you have to specify the role in the body. The roles are the ones created in step 2.

    ```json
    {
    "email": "maria.rodriguez@epn.edu.ec",
    "password": "@Maria01",
    "role": "area_manager"
    }
    ```

6. You can use the token (Bearer token) to access the other endpoints. Remember to include the token in the header of the request. Also, consider that the endpoints have different permissions, so you have to use the correct role to access them.

## Testing

This project has end-to-end tests implemented with Jest and SuperTest. To run the tests, execute the following command:

```bash
yarn test:e2e
```

## Documentation

The API documentation made with swagger is available at the address ```http://localhost:3000/api```.

Also, you can find the documentation in Postman [here](https://documenter.getpostman.com/view/5249295/2sA3kYjL6A).

## Good practices

This projects wants to implement good practices, so `CommitLint` is implemented and you have to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#:~:text=The%20Conventional%20Commits%20specification%20is,automated%20tools%20on%20top%20of) guideline.

## Observations

If you want to use this repository and make commits, you have to use Conventional Commits; the project has `Husky` and `CommitLint` implemented.

## License

Copyright (c) 2024 Bryan Tapia for Escuela Politécnica Nacional as Titling Project.
