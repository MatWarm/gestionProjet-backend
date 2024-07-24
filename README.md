To launch DB quickly : 


docker run --name mysql-instance -e MYSQL_ROOT_PASSWORD=pwd -e MYSQL_DATABASE=database -e MYSQL_USER=user -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:latest
