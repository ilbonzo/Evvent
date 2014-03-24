#!/bin/bash
mkdir -p /etc/puppet/modules
# puppet module install puppetlabs/nodejs
puppet module install willdurand-nodejs
apt-get update
