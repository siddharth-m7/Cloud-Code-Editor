# Dockerfile for a simple Ubuntu-based image
# This Dockerfile sets up a basic Ubuntu environment
FROM ubuntu:20.04 
# setup user
RUN useradd -ms /bin/bash sandbox
# Set the working directory
WORKDIR /home/sandbox

# update the ubuntu machine
RUN apt update && apt upgrade -y
# install nano and curl
RUN apt install nano curl -y

# install nodejs

RUN curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && apt-get install -y nodejs

# configuring ternimal to open current working directory
RUN echo "PS1='\w '" >> /home/sandbox/.bashrc

# setup the final working directory
WORKDIR /home/sandbox/app

