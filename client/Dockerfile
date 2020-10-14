FROM nginx:1.19.3

MAINTAINER "Jan Bártl <jan.bartl@morosystems.cz">

COPY --chown=nginx:nginx ./dist/ /usr/share/nginx/html
COPY ./docker-nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

