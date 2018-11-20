# base image - latest LTS
FROM node:carbon

# create and set working directory
RUN mkdir /app
WORKDIR /app

# install and cache app dependencies
COPY package.json /app
RUN yarn

# add `/app/node_modules/.bin` to $PATH
ENV PATH /data/node_modules/.bin:$PATH

# add source files
COPY . .

# expose ports
EXPOSE 5200

# start app
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
