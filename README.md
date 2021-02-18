## Running the app

```bash
# Create .env.development file
$ cp .env.example .env.development

# run migrate
$ yarn migrate

# development
$ yarn start:dev

# generate a new migration
$ yarn typeorm migration:create -n table_name

```