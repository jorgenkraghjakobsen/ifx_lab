# user, host, full path, and time/date
# on two lines for easier vgrepping
# entry in a nice long thread on the Arch Linux forums: https://bbs.archlinux.org/viewtopic.php?pid=521888#p521888

PROMPT=$'[%*] %{\e[0;34m%}%B[%{\e[1;33m%}%n%{\e[1;34m%}@%{\e[0m%}%{\e[0;35m%}%m%{\e[0;34m%}%B]%b%{\e[0m%}\n %{\e[0;40m%}%{\e[32m%}%~%{\e[0;34m%} %{\e[0;34m%}--->%{\e[0;34m%}%B[%{\e[1;35m%}$%{\e[0;34m%}%B]%{\e[0m%}%b '
date=date | awk '{print $4}'
for i in date
do
#	echo " "
done
