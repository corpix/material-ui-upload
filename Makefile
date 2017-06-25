.DEFAULT_GOAL := all

modules := ./node_modules
bin     := $(modules)/.bin
src     := ./src
scripts := ./scripts
PATH    := $(scripts):$(bin):$(PATH)

export PATH

.PHONY: all
all: build

.PHONY: build
build:  $(modules) $(src)
	$(scripts)/ensure-emacs-modes
	$(scripts)/build $(src)

.PHONY: test
test: $(modules) lint build
	$(bin)/jest --config .jest.json

.PHONY: $(modules) lint
lint:
	$(bin)/eslint .

yarn.lock $(modules): package.json
	# Ignoring scripts to prevent recursion
	yarn --ignore-scripts

.PHONY: tag
tag:
	git tag $(shell jq -r .version package.json)
