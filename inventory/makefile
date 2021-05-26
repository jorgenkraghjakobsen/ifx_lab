
rpi = rpi100

custom_resources:
	scp -r resources/ root@$(rpi).local:~/inventory/resources/
index:
	scp views/index.html root@$(rpi).local:~/inventory/views/
router:
	scp routes/index.js root@$(rpi).local:~/inventory/routes
bin:
	scp bin/www root@$(rpi).local:~/inventory/bin/www
node_modules_:
	scp -r node_modules/ root@$(rpi).local:~/inventory/node_modules

general: resources index router bin
