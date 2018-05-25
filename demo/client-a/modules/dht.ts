var spawn = require('child_process').spawn;
var filename = './modules/dht.py';
export function readDht(od, callback) {
    const dht = spawn('python',[filename]);
    var res = new Array();
    var exit = false;
    dht.stdout.on('data', function (data) {
      // console.log('stdout: ' + data.toString());
      var arr = data.toString().split(",");
      var temperature = parseInt(arr[0]);
      var humidity = parseInt(arr[1]);
      res['state'] = 0;
      res['temperature'] = temperature;
      res['humidity'] = humidity;
      callback(res, od);
    });

    dht.stderr.on('data', function (data) {
      // console.log('stderr: ' + data.toString());
      res['state'] = 1;
      callback(res, od);
    });


    dht.on('exit', function (code) {
      //console.log('child process exited with code ' + code.toString());
    });
   
}