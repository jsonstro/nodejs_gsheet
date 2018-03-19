#! /bin/bash

yum install epel-release
yum install open-vm-tools wget git postgresql-server

postgresql-setup initdb
# set both host and local auth to 'md5'
vi /var/lib/pgsql/data/pg_hba.conf 

service postgresql start
su - postgres

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

wget https://nodejs.org/download/release/latest/node-v9.8.0-linux-x64.tar.gz
tar --strip-components 1 -xvf node-v9.8.0-linux-x64.tar.gz -C /usr/local

git clone https://github.com/jsonstro/nodejs_gsheet.git

cd nodejs_gsheet/
npm i npm
npm install
npm update

mkdir server/config
vi server/config/config.json
mv credentials.json nodejs_gsheet/

npm run start

vi /etc/ssh/sshd_config 
mv 2017_mfg_data.csv csv/
