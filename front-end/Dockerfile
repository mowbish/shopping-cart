FROM node:13.12.0-alpine
WORKDIR /app/frontend

COPY package.json ./
COPY package-lock.json ./
COPY . ./
RUN npm install next

# RUN npm install react-scripts@3.4.1 -g 
RUN npm run dev

# RUN npm run build
EXPOSE 3000
EXPOSE 3001
