FROM node:20

WORKDIR /home/node
USER node

COPY --chown=node:node . .
RUN npm config set registry https://registry.npmmirror.com
RUN npm install
RUN npx drizzle-kit push

EXPOSE 1234
CMD ["npm", "run", "start"]
