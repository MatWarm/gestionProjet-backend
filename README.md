To launch DB quickly : 


docker run --name mysql-instance -e MYSQL_ROOT_PASSWORD=pwd -e MYSQL_DATABASE=database -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:latest

if you change your settings, or have you docker instance on an other computer you 'll need to change the database.js file 
