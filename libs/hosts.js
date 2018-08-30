'use strict';

const fs = require('fs');

class Hosts {

    constructor(file) {

        this._file = file;
        this._data = '';
        this._marker = '# jmaker host';

    }

    addHost(ip, hostName) {

        let data = this._loadFile();
        data += `${ip} ${hostName} ${this._marker}\n`;
        fs.writeFileSync(this._file, data);

    }

    rmHost(hostName) {

        hostName = hostName.replace(/(\W)/mg, '\\$1');

        let data = this._loadFile();
        let marker = this._marker.replace(/(\W)/mg, '\\$1');
        let exp = new RegExp(`^[^\s]+ ${hostName} ${marker}\n`, 'mg');
        data = data.replace(exp, '');
        fs.writeFileSync(this._file, data);

    }

    _loadFile() {

        let data = fs.readFileSync(this._file);
        return data.toString();

    }

}

module.exports = Hosts;
