# Use the official Node.js image as the base  
FROM node:18  

# Set the working directory inside the container  
WORKDIR /app 

# ENV OPENAI_MODEL=gpt-3.5-turbo
# ENV OPENAI_API_KEY=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
# ENV HOST=svc-012df3dd-534d-430a-a419-76bdec008e59-dml.gcp-scarolina-1.svc.singlestore.com
# ENV USER=admin
# ENV PASSWORD=YVw1pv1FRmjYrmN9OBPswh7cvMvGw0oo
# ENV SQL_DATABASE=testing_database
# ENV VEC_DATABASE=vector_db
# ENV PORT=3000

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