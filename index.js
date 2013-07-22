var EventEmitter = require('events').EventEmitter,
    util = require('util');

function LineBuffer() {
    EventEmitter.call(this);
    this.buffer = '';
    this.sep = '\n';
    this._dataEvent = 'data';
    this.lineEvent = 'line';
    this.on(this._dataEvent, this.processBuffer);
    const self = this;

    this.write = function(data) {
        self.buffer += data;
        self.emit(self._dataEvent);
        return self;
    };

}

util.inherits(LineBuffer, EventEmitter);

LineBuffer.prototype.processBuffer = function() {
    var index = this.buffer.indexOf(this.sep),
        line;
    if(index != -1) {
        line = this.buffer.slice(0, index); 
        this.emit(this.lineEvent, line);
        this.buffer = this.buffer.slice(index + 1);
    }
}

module.exports = LineBuffer;
