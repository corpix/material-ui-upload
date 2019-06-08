.DEFAULT_GOAL := all

name    := material-ui-upload
modules := ./node_modules
bin     := $(modules)/.bin
src     := ./src
scripts := ./scripts
PATH    := $(scripts):$(bin):$(PATH)

export PATH

.PHONY: all
all: build

.PHONY: build
build: $(modules) $(src)
	$(scripts)/ensure-emacs-modes
	$(scripts)/build $(src)

.PHONY: test
test: $(modules) lint build
	$(bin)/jest --config .jest.json

.PHONY: $(modules) lint
lint:
	$(bin)/eslint .

package-lock.json $(modules): package.json
	npm install --ignore-scripts
	touch package-lock.json $(modules)

.PHONY: tag
tag:
	git tag $(shell jq -r .version package.json)

.PHONY: server
server: build $(modules)
	if [ ! -e $(modules)/$(name) ];          \
	then                                     \
		ln -s $(PWD) $(modules)/$(name); \
	fi
	$(bin)/start-storybook -p 9001 -c .storybook
