# export swagger definitions
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path/../cetici-api"
npm run generate:swagger

# run openapi-generate
cd "$parent_path/.."
docker run -it -v "$parent_path/../cetici-api/spec:/swagger" -v "$parent_path/../cetici-ui/src/openapi-client:/local" --rm openapitools/openapi-generator-cli generate -i swagger/swagger.json -g typescript-fetch -o /local