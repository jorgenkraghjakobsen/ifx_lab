
rpi = rpi100

module:
	scp nmap_lib.js root@$(rpi).local:~/inventory/
index:
	scp views/index.html root@$(rpi).local:~/inventory/views/
router:
	scp routes/index.js root@$(rpi).local:~/inventory/routes
general: module index router
	