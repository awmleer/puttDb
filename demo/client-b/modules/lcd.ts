const exec = require('child_process').exec;
const filename = 'demo/client-b/modules/lcd.py';
export function setLcd(indat) {
	exec('python'+' '+filename+' '+indat, function(err, stdout, stderr) {
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


