# !/bin/bash

# Fetch the GitHub URL from the API server
export GIT_REPO_URL="$GIT_REPO_URL"
#GIT_REPO_URL=$(curl -s $API_SERVER_URL)

if [ -z "$GIT_REPO_URL" ]; then
    echo "No GitHub URL received from API server"
    exit 1
fi

# Clone the repository
git clone "$GITHUB_URL" /home/app/output

# Execute the build script
exec node script.js