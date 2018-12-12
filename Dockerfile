FROM node:8.1.3
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000

COPY package.json ./
RUN npm install --quiet
COPY server ./server
CMD ["npm", "start"]