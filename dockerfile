FROM node:20
 
USER node
WORKDIR /home/node
 
COPY . .
RUN npm install -g pnpm
RUN pnpm install
 
EXPOSE 1234 
CMD ["pnpm", "run", "start"]