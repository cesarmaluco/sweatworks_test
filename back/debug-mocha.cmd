REM Este arquivo sobrepõe as configurações definidas no launch.json e executa
REM diretamente o mocha com a porta correta de debug.
node --no-lazy ./node_modules/mocha/bin/mocha ./test/**/*.spec.js --debug-brk=%2 
