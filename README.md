# nginx-docker-loadbalancer
Loadbalancer using Nginx and Docker


Run using:

docker-compose build
docker-compose run


Шаги:

1. Установка Docker
	https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
	О Docker - https://badcode.ru/docker-tutorial-dlia-novichkov-rassmatrivaiem-docker-tak-iesli-by-on-byl-ighrovoi-pristavkoi/

2. Установка Docker-Compose
	https://docs.docker.com/compose/install/#install-compose-on-linux-systems
	О Compose - https://badcode.ru/docker-tutorial-dlia-novichkov-rassmatrivaiem-docker-tak-iesli-by-on-byl-ighrovoi-pristavkoi/#what_is_docker_compose
3. Создание docker-compose.yml
	Прописываем нужные параметры в файле для построения контейнеров (см комменты в файле)
4. Меняем параметры в nginx.conf на необходимые нам
	(см комменты в файле)
	Документация по конфигу https://nginx.org/ru/docs/http/ngx_http_upstream_module.html
	proxy_pass - https://nginx.org/ru/docs/http/ngx_http_proxy_module.html#proxy_pass
5. Прописываем Dockerfile для Node.js
	Стандартная структура файла с необходимыми нам параметрами
	Все комменты в файле docker/node/Dockerfile
6. В папке docker/node/app создаем app.js
	Пишем код простого api на node.js
7. Создаем тестовый файл test.js
	Пишем код теста на node.js
8. Тесты будут проводиться с помощью "k6"
	Это инструмент с открытым исходным кодом для нагрузочного тестирования и облачный сервис для тестирования производительности API.
	https://k6.io/
	Устанавливаем k6 на нашу систему: https://k6.io/docs/getting-started/installation/#debian-ubuntu
9. В целом все готово к запуску
	Сразу проверяем первый метод балансировки Round Robin (все параметры настроены как раз для него и в дальнейшем для других надо будет лишь менять nginx.conf (следуя основной статье из начала) и менять docker-compose.yml под изменения в nginx.conf)
	- docker-compose build
		это построит контейнеры по параметрам из docker-compose.yml
	- docker-compose up --scale api=3 -d
		это запустит наши контейнеры/сервисы (праметром --scale мы задали количество api)
	- ждем запуска сервисов
10. Открываем другое окно терминала и запускаем тест на k6
	-k6 run -u 200 -d 30s --summary-export=export.json --out json=my_test_result.json test.js
		тут параметры указывают количество тестов, время тестов, экспорт файлов с результатами в json и скрипт который и запускает тест test.js
	- тест отрабатывает и мы получаем результаты
11. Дальше проверяем следующие методы (по статье)
