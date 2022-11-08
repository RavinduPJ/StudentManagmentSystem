 FROM node

 WORKDIR /usr/src/app

 COPY package*.json ./

 RUN npm install

 COPY . .

 RUN npm run build
  
#  FROM nginx:alpine

#  COPY --from=node /app/dist/frontend /usr/share/nginx/html
 
 EXPOSE 4200:3000

 CMD ["npm","start"]

