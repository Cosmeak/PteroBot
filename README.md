# PteroBot - 🪶 A Discord Bot connected to your Pterodactyl API

This Discord Bot is a mission gived by `MrJuju0319#5801` to connect his Pterodactyl Panel to a Bot.

We decide to use only the Client part of the API to avoid potential big mistake like delete a server.

All commands are only usable by administrator.

## Bot Features

It can currently:
- [x] `/servers` - Show informations about all servers
- [x] `/server` - Show informations about a specific server with a selector to choose server
- [x] `/power {server_identifier} {state}` - Provide a way to change server state (start, stop, kill, restart)
- [x] `/send {server_identifier} {command}` - Send a command to a server
- [ ] `/safemode` - Stop, Kill and backups servers from lists
- [x] `/backups` - Show all backups for a server
- [x] `/create-backup` - Create a new backup for a server
- [x] `/help` - Show information about all available commands
- [ ] `/realtime {server_identifier} {channel_id}` - Associate channel command to a server and refresh regularly server informations

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

## License

This project use the [MIT LICENSE](./LICENSE). Be sure to respect it!
