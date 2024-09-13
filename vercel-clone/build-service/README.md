# Build Service

A docker container that builds a node.js application and pushes it to an S3 bucket.

Features:

- [ ] Docker container that listens to a queue for build requests
- [x] Pulls the source code from a GitHub url
- [ ] Error handling for invalid GitHub urls
- [ ] Generates a unique build id for each build request
- [x] Builds the source code
- [ ] Pushes the build to an S3 bucket

## Getting Started

1. Docker is required to run this project. Install Docker by following the instructions [here](https://docs.docker.com/get-docker/).
2. Clone the repository and navigate to the `build-service` directory.
3. Build the docker image with the following command:
```bash
docker build -t build-service .
```
4. Run the docker container with the following command:
```bash
docker run -d build-service
```
