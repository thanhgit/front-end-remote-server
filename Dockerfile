FROM node:8.6

LABEL version="1.0"
LABEL maintainer = "thanh29695@gmail.com"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN sed -i -e "s/localhost/backend/g" package.json
RUN ls
RUN npm install --production
COPY . .

EXPOSE 3000

CMD ["npm", "start"]