const { spawnSync } = require('child_process');

module.exports.run = function(command, args) {
    var extraParams = {};
    
    extraParams.encoding = 'utf-8';
    extraParams.maxBuffer = 1024 * 1024 * 10

    var spawn = spawnSync(command, args, extraParams);

    if (spawn.stdout) {
        
        console.log("Command executed: " + command)
        console.log("With the following args: " + args.toString());
        console.log("Having the following return: " + spawn.stdout.toString());
    }

    if (spawn.error !== undefined || spawn.status !== 0) {
        var errorMessage = '';
        if (spawn.error !== undefined) {
            errorMessage = spawn.error;
        } 
        
        if (spawn.stderr !== undefined) {
            errorMessage += " " + spawn.stderr.toString();
        }
        console.error(errorMessage);
        throw Error(errorMessage);
    } 
}