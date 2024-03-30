# Use the official Node.js image as the base
FROM node:18  

# Set the working directory inside the container
WORKDIR /app 

# Define build arguments
ARG OPENAI_MODEL
ARG OPENAI_API_KEY
ARG HOST
ARG SINGLESTORE_USER
ARG PASSWORD
ARG DATABASE
ARG PROJECT
ARG LOCATION
ARG ENDPOINT
ARG MODEL
ARG PUBLISHER
ARG JWT_SECRET
ARG NEXTAUTH_URL
ARG ACEE_URL
ARG NEXTAUTH_SECRET
ARG EMAIL_USERNAME
ARG EMAIL_PASSWORD

# Set environment variables equal to build arguments
ENV OPENAI_MODEL=${OPENAI_MODEL}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV HOST=${HOST}
ENV SINGLESTORE_USER=${SINGLESTORE_USER}
ENV PASSWORD=${PASSWORD}
ENV DATABASE=${DATABASE}
ENV PROJECT=${PROJECT}
ENV LOCATION=${LOCATION}
ENV ENDPOINT=${ENDPOINT}
ENV MODEL=${MODEL}
ENV PUBLISHER=${PUBLISHER}
ENV JWT_SECRET=${JWT_SECRET}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV ACEE_URL=${ACEE_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV EMAIL_USERNAME=${EMAIL_USERNAME}
ENV EMAIL_PASSWORD=${EMAIL_PASSWORD}

# Copy package.json and package-lock.json to the container  
COPY package*.json ./  
COPY next.config.js tsconfig.json ./
COPY tailwind.config.ts postcss.config.js ./

# Install dependencies
RUN npm install

# Copy the app source code to the container  
COPY . .  

# Build the Next.js app  
RUN npm run build  

# Expose the port the app will run on  
EXPOSE 3000  

# Start the app  
CMD ["npm", "start"]
