FROM n8nio/n8n:latest

USER root

RUN npm install -g node-fetch@2

USER node