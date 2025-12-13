# Express Course by Rezi Karanadze

## Setting Up Your Development Environment

This project uses [Volta](https://volta.sh/) to manage Node.js versions.

### 1. Install Volta

If you don't have Volta installed, run the following command in your terminal:

```sh
curl https://get.volta.sh | bash
```

After installation, restart your terminal, or follow any post-install instructions provided by Volta.

### 2. Pin the Correct Node Version

To ensure your environment uses the exact Node.js version specified for this project (`24.12.0`), run:

```sh
volta pin node@24.12.0
```

(You only need to do this if you ever want to change the project's pinned version; this project already has `.volta` configuration, so Volta will automatically use the correct version.)

Now, whenever you run `node`, `npm`, or related tools in this project directory, Volta will automatically select Node.js 24.12.0 for you.
