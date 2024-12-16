FROM node:22-alpine

# Install tini and other development essentials
RUN apk add --no-cache \
    tini \
    git \
    bash \
    curl \
    openssh-client 

# Create and set working directory
WORKDIR /app

# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]

# Default command
CMD ["echo", "start"]