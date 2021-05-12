
rpi = rpi100

module:
	scp nmap_lib.js root@$(rpi).local:~/inventory/
index:
	scp views/index.html root@$(rpi).local:~/inventory/views/
router:
	scp routes/index.js root@$(rpi).local:~/inventory/routes
bin:
	scp bin/www root@$(rpi).local:/inventory/bin/www
general: module index router bin
