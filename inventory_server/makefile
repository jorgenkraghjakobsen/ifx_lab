rpi = rpi224

main:
	scp -r main.py root@$(rpi).local:~/inventory_server

resources_:
	scp -r resources/ root@$(rpi).local:~/inventory_server/

all: main resources_
