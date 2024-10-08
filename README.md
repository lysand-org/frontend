<p align="center">
  <a href="https://versia.pub"><img src="https://cdn.versia.pub/branding/logo-dark.svg" alt="Versia Logo" height="110"></a>
</p>

<center><h1><code>versia-fe</code></h1></center>

**Versia-FE** is a beautiful, fast and responsive front-end for the Versia Server project.

## Features

- [x] Timelines: public, home, local
- [x] Login
- [x] Notifications
- [x] Replies
- [x] Quotes
- [x] Markdown posts (quasi-unrestricted)
- [x] Dark mode
- [x] Following
- [x] Multiple accounts
- [x] Custom Emojis
- [x] Versia Server Permissions support
- [x] Note editing
- [x] Alt text support everywhere
- [x] Media uploads
- [x] WCAG 2.2 AAA compliance
  - Testing is automated and may not catch all issues, please report any accessibility issues you find.
- [x] Settings
- [x] Profile editing

### Browser Support

The following browsers are **supported** (issues will be prioritized):
- **Chromium**: `110+`
- **Firefox**: `110+`
- **Safari**: `16+`
- **IE**: None.

The following browsers will very likely work, but are not officially supported:
- **Chromium**: `80+`
- **Firefox**: `80+`
- **Safari**: `12+`
- **IE**: None.

Other browsers may work, but are not guaranteed to.

## Performance

### JavaScript Bloat

The **total** JavaScript bundle size is less than `900 kB`, but this is made even smaller by the fact that the bundle is split into multiple files, and only the necessary files are loaded on each page.

### Benchmarks

Benchmarks are due to be conducted soon™.

## Installation

Versia-FE is included in the provided `docker-compose` file during [Versia Server installation](https://github.com/versia-pub/server/blob/main/docs/installation.md).

To have Versia-FE and Versia Server running on the same domain, edit the Versia Server configuration to point to the Versia-FE container's address (`frontend` category inside config).

### Manual Installation

Here are the steps to install Versia-FE manually:

#### Docker/Podman

```yaml
services:
    fe:
        image: ghcr.io/versia-pub/frontend:main
        container_name: versia-fe
        restart: unless-stopped
        networks:
            - versia-net
        environment:
            NUXT_PUBLIC_API_HOST: https://yourserver.com
            # For Tor users, set the following environment variable in addition to the above
            # NUXT_PUBLIC_ONION_API_HOST: http://youronionserver.onion
```

Then, the frontend will be available at `http://localhost:3000` inside the container. To link it to a Versia Server, set the `NUXT_PUBLIC_API_HOST` environment variable to the server's URL.

## License

This project is licensed under the AGPL 3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

### Projects

- [**Bun**](https://bun.sh): Thanks to the Bun team for creating an amazing JavaScript runtime.
- [**Nuxt**](https://nuxt.com): Thanks to the Nuxt team for creating an amazing Vue framework.

### People

- [**April John**](https://github.com/cutestnekoaqua): Creator and maintainer of the Versia Server ActivityPub bridge.