# Durable Functions Parent Orchestrator

This project implements an Azure Durable Functions parent orchestrator that makes use of child orchestrations.

## Overview

The parent orchestrator (`durableParentOrchestrator`) is responsible for calling a child orchestration using the `callHttp` method from the Durable Functions library. The project demonstrates how to start an Azure Durable Functions orchestration through an HTTP trigger (`durableParentHttpStart`). The HTTP trigger accepts a JSON payload, starts the parent orchestration, and returns a response with the orchestration instance ID.

## Prerequisites

- [Azure Functions Tools for Visual Studio Code](https://code.visualstudio.com/docs/azure/extensions/functions) (Optional but recommended)
- Azure subscription
- Node.js and npm installed

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/AmyLovelace/Durable-Function-Orchestration.git
    cd <repository-directory>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure local settings:

    Copy the `.env.example` file to `.env` and update the values with your specific configuration.

## Usage

### Running Locally

1. Start the Azure Functions runtime:

    ```bash
    npm start
    ```

2. Use a tool like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to send an HTTP POST request to `http://localhost:7071/orchestrators/{orchestratorName}` with a JSON payload as the request body.

### Deploying to Azure

Follow the Azure Functions deployment process to deploy the function app to your Azure subscription.

## Code Structure

- `index.ts`: Entry point for the Azure Functions application.
- `durableParentOrchestrator`: Parent orchestrator function that calls a child orchestration.
- `durableParentHttpStart`: HTTP trigger function to start the parent orchestration.

## Dependencies

- `@azure/functions`: Azure Functions bindings and runtime.
- `durable-functions`: Durable Functions extension for Azure Functions.

## Contributing

Feel free to open issues, submit pull requests, or provide feedback. Contributions are welcome!

## License

This project is licensed under the [MIT License](LICENSE).

