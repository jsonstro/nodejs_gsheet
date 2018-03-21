#! /bin/bash

yum install epel-release
yum install open-vm-tools wget git postgresql-server nginx certbot-nginx

postgresql-setup initdb

# set both host and local auth to 'md5'
vi /var/lib/pgsql/data/pg_hba.conf 

service postgresql start
systemctl enable postgresql.service

# set password for inboard db user
echo "Do the following setup to postgres"
cat << EOF
  psql postgres
    CREATE ROLE inboard with LOGIN PASSWORD '<PASSWORD>';
    ALTER ROLE inboard CREATEDB;
    \du
    \q

  psql postgres -U inboard
    CREATE DATABASE inboard;
    GRANT ALL PRIVILEGES ON DATABASE inboard TO inboard;
    \connect inboard
    \dt
    \q

  exit
EOF
su - postgres

# install the latest node
wget https://nodejs.org/download/release/latest/node-v9.8.0-linux-x64.tar.gz
tar --strip-components 1 -xvf node-v9.8.0-linux-x64.tar.gz -C /usr/local

git clone https://github.com/jsonstro/nodejs_gsheet.git

cd nodejs_gsheet/
npm i npm
npm install
npm update

cp server/config/example.json server/config/config.json

# set password in config
vi server/config/config.json

# unzip secrets.zip to create credentials.json and get csv for 2017 data
unzip secrets.zip
mv 2017_mfg_data.csv csv/

firewall-cmd --zone=public --add-port=3000/tcp

npm run start

# disable root ssh, etc.
vi /etc/ssh/sshd_config 

firewall-cmd --zone=public --add-service=http --permanent
firewall-cmd --zone=public --add-service=http

#firewall-cmd --zone=public --add-port=3000/tcp --permanent
#firewall-cmd --zone=public --remove-port=3000/tcp --permanent
