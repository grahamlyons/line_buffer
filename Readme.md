# Line Buffering Module

Example usage:

```javascript
var LineBuffer = require('line_buffer'),
    fs = require('fs);

var lb = new LineBuffer();
lb.on('line', console.log);

var rs = fs.createReadStream('./a-big-long-file.txt');
rs.on('readable', function() {
    var data;
    while((data = rs.read()) != null) {
        lb.write(data);
    }
});
```
