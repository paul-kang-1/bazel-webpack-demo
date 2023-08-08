load("@aspect_rules_js//npm:defs.bzl", "npm_package")

# make this library available via node_modules
npm_package(
    name = "utils",
    srcs = [
        "package.json",
        "index.js",
		"index.d.ts",
    ],
    include_runfiles = False,
    visibility = ["//visibility:public"],
)

