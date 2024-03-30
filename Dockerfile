# Use the official Node.js image as the base  
FROM node:18  

# Set the working directory inside the container  
WORKDIR /app 

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
