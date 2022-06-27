# export swagger definitions
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path/../cetici-api"
npm run generate:swagger
cd ..
docker compose run openapi-generate