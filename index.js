#!/usr/bin/env node
'use strict';

const path = require('path');
const yargs = require('yargs');
const Redis = require('ioredis');
const Hosts = require('./libs/hosts');

const argv = yargs
    .option('-f', {
        alias: 'file',
        default: '/etc/hosts'
    })
    .argv;

(async _ => {

    let file = path.resolve(argv.file);
    let hosts = new Hosts(file);
    let redis = new Redis;

    await redis.subscribe(
        'jmaker:containers:started',
        'jmaker:containers:stoped',
    );

    redis.on('message', async (channel, message) => {

        let data = JSON.parse(message);
        let {
            manifest,
            info,
            eventName,
        } = data;

        let ip4 = info['ip4.addr'] ? info['ip4.addr'] : '127.0.0.1';
        let ip6 = info['ip6.addr'] ? info['ip6.addr'] : '::1';
        let hostname = info['host.hostname'];

        switch (eventName) {

            case 'started':

                console.log("add host", ip4, hostname);
                console.log("add host", ip6, hostname);
                hosts.addHost(ip4, hostname);
                hosts.addHost(ip6, hostname);
                break;

            case 'stoped':
                console.log("rm host", hostname);
                hosts.rmHost(hostname);
                break;

        }

    });

})();
