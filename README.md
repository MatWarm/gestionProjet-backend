To launch DB quickly : 


docker run --name mysql-instance -e MYSQL_ROOT_PASSWORD=pwd -e MYSQL_DATABASE=database -e MYSQL_USER=myuser -e MYSQL_PASSWORD=mypassword -p 3306:3306 -d mysql:latest
