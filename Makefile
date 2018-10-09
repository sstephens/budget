
remove-install:
	rm -rf node_modules yarn.lock

install:
	yarn

reinstall: remove-install install

serve:
	yarn start

build:
	yarn build
