FROM node:20
 
USER node
WORKDIR /home/node
 
COPY . .
RUN npm config set registry https://registry.npmmirror.com
RUN npm install
 
EXPOSE 1234 
CMD ["npm", "run", "start"]