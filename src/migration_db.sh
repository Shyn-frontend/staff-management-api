ts-node ./node_modules/typeorm/cli.js schema:drop
ts-node ./node_modules/typeorm/cli.js migration:run
ts-node ./node_modules/typeorm-seeding/dist/cli.js seed
# typeorm seed:run --seed 20191031084601-init-admin-user.js
