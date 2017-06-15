FROM node:6.9.1

RUN mkdir /hardware/

WORKDIR /hardware/

ADD . /hardware/

RUN npm install

EXPOSE 4000

CMD ["npm","start"]