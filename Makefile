.PHONY: login build upload

branch := $(shell git symbolic-ref -q --short HEAD || git describe --tags --exact-match)

img_name = maf-portfolio
registry_host = registry-maf.0x07.co.uk:5000

img_tag = $(registry_host)/$(img_name):$(branch)

login:
	docker login -u registry -p 25st0rest $(registry_host)

build:
	docker build . --tag $(img_tag)

upload: build login
	docker push $(img_tag)
