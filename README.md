## Installation

1. download latest package file from release page.
2. run command `$ sudo pkg add {{package file}}`.
3. run command `$ sudo sysrc jmaker_hosts_file_registrator_enable=YES`.
4. and run service in background `service jmaker-hosts-file-registrator start`.

## Configuration

- see `/usr/local/etc/rc.d/jmaker-hosts-file-registrator` for configuration service
- run `$ jmaker-hosts-file-registrator --help`
