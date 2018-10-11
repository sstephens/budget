
remove-install:
	rm -rf node_modules yarn.lock

install:
	yarn

reinstall: remove-install install

serve:
	NODE_ENV=development webpack-dev-server

build:
	NODE_ENV=development webpack

prod:
	NODE_ENV=production webpack
