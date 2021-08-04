# Author: TheBallMarcus (Github: github.com/theballmarcus)


date=date | awk '{print $4}'

 
failed=$'%{\e[1;31m%}✗'
promt_gen() {
    echo '$(promt_code)'
}
promt_user() {
    echo '%{\e[0;34m%}%B[%{\e[1;33m%}%n%{\e[1;34m%}@%{\e[0m%}%{\e[0;35m%}%m%{\e[0;34m%}%B]%b%{\e[0m%}'
}
promt_dir() {
    echo ' %{\e[0;40m%}%{\e[32m%}%~%{\e[0;34m%} %{\e[0;34m%}-->%{\e[0;34m%}%B[%{\e[1;35m%}$%{\e[0;34m%}%B]%{\e[0m%}%b '
}
return_status() {
   echo "%(?..%{\e[1;31m%}✗ )"
}
# set the git_prompt_info text
ZSH_THEME_GIT_PROMPT_PREFIX="("
ZSH_THEME_GIT_PROMPT_SUFFIX=")"
ZSH_THEME_GIT_PROMPT_DIRTY="*"
ZSH_THEME_GIT_PROMPT_CLEAN=""

PROMPT='$(promt_user)$(promt_dir)$(return_status)%b'
RPROMPT=$'%{\e[1;32m%}$(git_prompt_info)%{\e[0;0m%}  [%*]'
