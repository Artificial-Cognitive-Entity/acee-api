# Use the official Node.js image as the base  
FROM node:18  

# Set the working directory inside the container  
WORKDIR /app 

ENV OPENAI_MODEL=gpt-3.5-turbo
ENV OPENAI_API_KEY=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
ENV HOST=svc-29ca081a-ef35-4821-b1c7-f739c5128204-dml.gcp-scarolina-1.svc.singlestore.com
ENV PORT=3306
ENV SINGLESTORE_USER=admin
ENV PASSWORD=C5DzSO7W7zTASRAUKm3eG2p0q2kQhllc
ENV DATABASE=acee_db
ENV PORT=3000
ENV PROJECT=artificial-cognitive-entity
ENV LOCATION=us-east1
ENV ENDPOINT=us-central1-aiplatform.googleapis.com
ENV MODEL=textembedding-gecko@003
ENV PUBLISHER=google
ENV JWT_SECRET=4f432aacc3a25feccbf3c92a6c3bc089c3c8a467507c9dd91392783a8b4b5ac0
ENV NEXTAUTH_URL=https://acee-api-tbilz672oa-ue.a.run.app
ENV ACEE_URL=https://acee-api-tbilz672oa-ue.a.run.app
ENV NEXTAUTH_SECRET=90a31bdb7fb3bc4a461b7c7c6b9dcd858961cbc2131c25f306d8c0fda9035ad9

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