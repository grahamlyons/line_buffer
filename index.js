var EventEmitter = require('events').EventEmitter,
    util = require('util');

function LineBuffer() {
    EventEmitter.call(this);
    this.buffer = '';
    this.sep = '\n';
    this._dataEvent = 'data';
    this.lineEvent = 'line';
    this.on(this._dataEvent, this.processBuffer);
}

util.inherits(LineBuffer, EventEmitter);

LineBuffer.prototype.write = function(data) {
    this.buffer += data;
    this.emit(this._dataEvent);
    return this;
};

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
