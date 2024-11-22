FROM node:2020
 
USER node
WORKDIR /home/node
 
COPY . .
RUN npm install -g pnpm
RUN pnpm install
 
EXPOSE 1234 
CMD ["npm", "run", "start"]