var exec = require('child_process').exec;
var filename = 'modules/dht.py';
function readDht(pin) {
	exec('python'+' '+filename+' '+pin, function(err, stdout, stderr) {
		if (err) {
			console.log(err);
		}
		if (stdout) {
			console.log(stdout);
		}	
		if (stderr) {
			console.log(stderr);
		}
	});
}

module.exports = {
	readDht: readDht,
} 
