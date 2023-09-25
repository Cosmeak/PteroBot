# PteroBot - 🪶 A Discord Bot connected to your Pterodactyl API
This Discord Bot is a mission gived by `MrJuju0319#5801` to connect his Pterodactyl Panel to a Bot.

We decide to use only the Client part of the API to avoid potential big mistake like delete a server.
This bot can only control server instances but not delete or manage them.

## Bot Features
It can currently: 
- [x] `/servers` - Show informations about servers
- [x] `/server {identifier}` - Show informations about a specific server
- [x] `/power {identifier} {state}` - Provide a way to change server state (start, stop, kill, restart)
- [x] `/send {identifier} {command}` - Send a command to a server
- [ ] `/safemode` 👑 - Stop, Kill and backups servers from lists 
- [x] `/backups {identifier}` - Show all backups for a server
- [x] `/create-backup {identifier}` - Create a new backup for a server
- [x] `/help` - Show information about all available commands
- [ ] `/add-key` - Add your api key to access your server information (only in bot private messages)

<small>👑: only for admins</small>

## How to Install and Run the Project
In a first time you need to duplicate and rename `.env.example`to `.env` and complete necessary variables.

In a second time:
```bash
# Install dependencies
$ yarn install

# Launch bot in development mode
# - I used nodemon to automatically relaunch server after file changes
$ yarn dev 

# Launch bot in production mode
$ yarn start

# Deploy commands
$ yarn command:deploy
```

## Contribute
The project respect the [conventional commits](https://www.conventionalcommits.org/fr/v1.0.0/), so follow the rules carefully.

In other hand, eslint check all code you write here, remember to check what you are doing with `yarn lint` and if you have some errors / warnings, it can be resolved with the `yarn lint:fix` command to simplify your life.

Happy coding everyone and see you on discord. 👋
