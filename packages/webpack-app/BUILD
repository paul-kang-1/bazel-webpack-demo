load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@aspect_rules_webpack//webpack:defs.bzl", "webpack_bundle", "webpack_devserver")

npm_link_all_packages(
    name = "node_modules",
)

webpack_bundle(
    name = "bundle",
    srcs = glob(["src/**"]),
	chdir = package_name(),
    node_modules = ":node_modules",
	output_dir = True,
	webpack_config = ":webpack.config.js",
	deps = [
		":tsconfig.json",
		":node_modules/@types/lodash",
		":node_modules/lodash",
		":node_modules/ts-loader",
		":node_modules/utils",
	],
)

webpack_devserver(
	name = "serve",
	node_modules = ":node_modules",
	chdir = package_name(),
	webpack_config = ":webpack.config.js",
	data = glob(["src/**", "dist/**"]) + [
		":tsconfig.json",
		":node_modules/@types/lodash",
		":node_modules/lodash",
		":node_modules/ts-loader",
		":node_modules/utils",
	]
)

ts_project(
    name = "transpile",
    srcs = glob(["src/**"]),
    allow_js = True,
	root_dir = "src",
	out_dir = "dist",
    tsconfig = ":tsconfig.json",
    deps = [
        ":node_modules",
    ],
)
