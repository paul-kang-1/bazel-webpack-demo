load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_webpack//webpack:defs.bzl", "webpack_bundle", "webpack_devserver")
load("@rules_oci//oci:defs.bzl", "oci_image", "oci_tarball")
load("@aspect_rules_js//js:defs.bzl", "js_image_layer")
load("@rules_pkg//:pkg.bzl", "pkg_tar")

npm_link_all_packages(
    name = "node_modules",
)

webpack_bundle(
    name = "bundle",
    srcs = glob(["src/**"]),
	chdir = package_name(),
    node_modules = ":node_modules",
	entry_point = "src/index.ts",
	webpack_config = ":webpack.config.js",
	deps = [
		":tsconfig.json",
		":node_modules/@types/lodash",
		":node_modules/lodash",
		":node_modules/ts-loader",
		":node_modules/utils",
	],
	data = [ "dist/index.html" ],
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

pkg_tar(
	name = "static_tar",
	srcs = [":bundle", "dist/index.html"],
	package_dir = "/usr/share/nginx/html",
)

oci_image(
	name = "image",
	base = "@nginx_debian_slim",
	tars = [
		":static_tar",
	],
)

oci_tarball(
	name ="image_tar",
	image = ":image",
	repo_tags = ["webpack-app:latest"],
)

