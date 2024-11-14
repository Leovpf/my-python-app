FROM node:14

WORKDIR /app

COPY ./calculator.js .


EXPOSE 8097

# Comando para rodar a aplicação
CMD ["node", "calculator.js"]
