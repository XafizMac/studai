# Используем базовый образ Node.js для сборки
FROM node:14 AS builder

# Создаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем приложение
RUN npm run build

# Используем базовый образ Node.js для финального образа
FROM node:14 AS runtime

# Создаем рабочую директорию в контейнере
WORKDIR /app

# Копируем зависимости и собранные файлы из стадии сборки
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Экспонируем порт, который будет использоваться приложением
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
