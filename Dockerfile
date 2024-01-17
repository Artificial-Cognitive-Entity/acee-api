# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container
WORKDIR .

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./src/app/ ./src/app/ 

# Expose the port your app runs on
EXPOSE 3000

ENV OPENAI_MODEL = gpt-3.5-turbo
ENV OPENAI_API_KEY = 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
ENV HOST = svc-012df3dd-534d-430a-a419-76bdec008e59-dml.gcp-scarolina-1.svc.singlestore.com
ENV USER = admin
ENV PASSWORD = YVw1pv1FRmjYrmN9OBPswh7cvMvGw0oo
ENV SQL_DATABASE = testing_database
ENV VEC_DATABASE = vector_db
ENV PORT = 3000


# Command to run your application
CMD ["npm", "start"]
