# Vercel Clone

A simple clone of the Vercel platform that allows users to deploy and host their websites.

## Architecture

- Upload service:
    - Takes a github repository URL and get the files from the repository.
    - The service then uploads the files to the storage service.
    - Get the object ID and then use it to start the deployment service.
- Deployment service:
    - Using the object ID, the service gets the files from the storage service.
    - Build the application using the files.
- Request Handler service:
    - Exposes and endpoint that users can request to interact with the built application.
    - Uses a cache to store the built applications and their URLs to serve the requests.

### Design Considerations

1. Why separate the upload service from the deployment service?
    - The upload service is responsible for getting the files from the github repository and uploading them to the storage service. This service is less resource intensive and does not require the same resources as the deployment service. Separating the services allows for better resource management and scalable architecture.

2. This architecture allows for build of only client side applications. Example: React, Angular, Vue, HTML, CSS, JS applications.

## Credits

- [Vercel](https://vercel.com/): The original platform that inspired this project.
- [Tutorial: Vercel in 4 hours](https://www.youtube.com/watch?v=c8_tafixiAs&t=222s): The tutorial that inspired this project.