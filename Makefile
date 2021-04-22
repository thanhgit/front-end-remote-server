PHONY: start-server stop-server list-server

start-server:
	sh build-script.sh

stop-server:
	docker-compose down

list-server:
	docker-compose ps

log-server:
	docker-compose logs -f