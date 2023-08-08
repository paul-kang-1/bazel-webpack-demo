## Webpack / Containerization E2E with Bazel
This repository provides an example of integrating Bazel with the e2e procedure of:

1. Installing `node_modules` with a NodeJS package manager (`pnpm`)
2. Bundling the code and assets with `Webpack`
3. Serving the bundled static files either locally (via `devserver`) or through a Docker image (via `nginx`)

Aspect's `rules_oci` and `rules_webpack` were used to implement this build system.

As a mode of comparison, each steps are also built to be runnable locally without `Bazel`.

### Requirements
- `Bazel ^6.0.0`
- `Node` and `pnpm` (only if running the project without Bazel)

### Installation

#### Building via Bazel
Building/updating the image is as simple as below:
```sh
bazel run image_tar
# Try running the image w/ below command
docker run --rm -p 8080:80 webpack-app:latest
```
Unlike the standard approach on containerization (installing deps, bundling code and serving all inside a container, as defined in a `Dockerfile`), this method runs the first two steps in the Bazel sandbox, and only feeds the generated static files to the image. This approach is advantageous in various ways:

- Maintain the same level of hermeticity compared to a container build process
- Minimize the number of dependencies and layers required to build an image (decouple NodeJS from image)
- Make better use of caching in different parts (`pnpm` and `webpack`) - an advantage of an artifact-based build system

Try making changes in the source code (e.g. `packages/webpack-app/src/index.ts`) then repeat the steps above to see updates in the image. Make sure to either do a hard reload (`CTRL+SHIFT+R`) or keep the browser on private mode to prevent serving cached files.

Bundling code and monitoring changes (via Webpack `devserver`) without building a container are also possible in Bazel. This workflow could be used in the development phase.
```sh
cd packages/webpack-app
# pnpm istart uses iBazel to generate files / live reload changes
# check localhost:8080
pnpm istart
# create files without serving them
bazel build bundle
```

#### Building Locally
- Install `node_modules` via `pnpm install`
- Generate and serve files via:
    ```sh
    cd packages/webpack-app
    pnpm start
    ```
- Or build and run the image by:
    ```sh
    docker build . -t webpack-app:latest
    docker run --rm -p 8080:8080 webpack-app:latest
    ```
