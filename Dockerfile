FROM node:12.16.1-alpine3.11

ENV AWS_REGION=us-east-1
ENV NODE_ENV=production
ENV PORT=8080

COPY package.json package.json
COPY ./src ./src
RUN npm install --production

EXPOSE 8080

CMD ["node", "src/app.js"]

