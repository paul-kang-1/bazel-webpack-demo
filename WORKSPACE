load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "aspect_rules_js",
    sha256 = "dcd1567d4a93a8634ec0b888b371a60b93c18d980f77dace02eb176531a71fcf",
    strip_prefix = "rules_js-1.26.0",
    url = "https://github.com/aspect-build/rules_js/releases/download/v1.26.0/rules_js-v1.26.0.tar.gz",
)

http_archive(
    name = "aspect_rules_ts",
    sha256 = "4c3f34fff9f96ffc9c26635d8235a32a23a6797324486c7d23c1dfa477e8b451",
    strip_prefix = "rules_ts-1.4.5",
    url = "https://github.com/aspect-build/rules_ts/releases/download/v1.4.5/rules_ts-v1.4.5.tar.gz",
)

http_archive(
    name = "aspect_rules_webpack",
    sha256 = "78d05d9e87ee804accca80a4fec98a66f146b6058e915eae3d97190397ad12df",
    strip_prefix = "rules_webpack-0.12.0",
    url = "https://github.com/aspect-build/rules_webpack/releases/download/v0.12.0/rules_webpack-v0.12.0.tar.gz",
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

rules_ts_dependencies(ts_version_from = "//packages/webpack-app:package.json")

load("@aspect_rules_webpack//webpack:dependencies.bzl", "rules_webpack_dependencies")

rules_webpack_dependencies()

load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = DEFAULT_NODE_VERSION,
)

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    bins = {
        # derived from "bin" attribute in node_modules/typescript/package.json
        "typescript": {
            "tsc": "./bin/tsc",
            "tsserver": "./bin/tsserver",
        },
    },
    # npmrc = "//:.npmrc",
    pnpm_lock = "//:pnpm-lock.yaml",
    verify_node_modules_ignored = "//:.bazelignore",
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()
