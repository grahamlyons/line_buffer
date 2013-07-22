var tst = require('tst'),
    assert = require('assert'),
    LineBuffer = require('../index');

tst('Single line emitted', function() {
    var lb = new LineBuffer();
    var expectedLine = 'Hello';
    var success = false;
    lb.on('line', function(line) {
        assert.equal(line, expectedLine);
        success = true;
    });
    lb.write(expectedLine + '\n');
    assert.ok(success);
});

tst('No line emitted', function() {
    var lb = new LineBuffer();
    lb.on('line', function(line) {
        assert.fail('Should not get to here');
    });
    lb.write('foo');
});

tst('Two lines emitted', function() {
    var lb = new LineBuffer();
    var expectedLines = ['Hello', 'World'];
    var count = 0;
    lb.on('line', function(line) {
        count++;
    });
    expectedLines.forEach(function(line) {
        lb.write(line + '\n');
    });
    assert.equal(expectedLines.length, count);
});

tst('Line emitted when subsequent data written', function() {
    var lb = new LineBuffer();
    var parts = ['Hello', 'World', 'Foo', 'Bar'];
    lb.on('line', function(line) {
        assert.equal(parts.join(''), line);
    });
    parts.forEach(lb.write);
    lb.write('\n');
});

