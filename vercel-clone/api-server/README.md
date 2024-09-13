# API Server

An asynchronous API server that handles POST requests to `/api/deploy` to send a GitHub url to the build service.

Features:
- [x] Simple server that listens on port 3000
- [x] Simple Regexp URL validation for GitHub urls
- [x] POST request handler to `/api/deploy` to receive a GitHub url
- [ ] Generate a unique build id for each build request
- [ ] Attach the build id to the github url and sends it to a queue for the build service to consume -> AWS SQS
- [ ] Receive a build status from the build service

## Getting Started

1. Deno is required to run this project. Install Deno by following the instructions [here](https://deno.land/#installation).
2. Clone the repository and navigate to the `api-server` directory.
3. Run the server with the following command:
```bash
deno task start
```
