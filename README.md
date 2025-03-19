# n8n with PostgreSQL, Redis and workers

Starts n8n with PostgreSQL as database, Redis to increase performance and workers.

## Start

To start simply start you need to create the `.env` file and fill the variables, like passwords.

```
cp .env.example .env
```

After, start the services.
```
docker compose up -d
```

To stop it execute:

```
docker compose stop
```

## Configuration

All the settings are into [`.env.example`](.env.example) file in the current directory.
