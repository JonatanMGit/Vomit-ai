# Vomit Ai
This is a Discord Bot wich sends a gif for what you search
## Features
Corresponding Gif to any message you send
A Vomit Gif every full Hour
## Building
`docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t ghcr.io/jonatanmgit/vomitai:latest .`
## Deploying
`docker run -e DisToken='Discord Token here' -e TenToken='Tenor token here' vomitai:latest`
