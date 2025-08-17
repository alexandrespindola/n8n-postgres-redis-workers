FROM n8nio/n8n:next

USER root

RUN npm install -g node-fetch@2 moment moment-timezone lodash uuid validator date-fns jsonpath joi form-data @faker-js/faker ms

USER node