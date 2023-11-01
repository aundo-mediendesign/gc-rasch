FROM golang:alpine

RUN apk add --no-cache git && \
    cd /tmp && \
    git clone https://github.com/FiloSottile/mkcert && cd mkcert && \
    go build -ldflags "-X main.Version=$(git describe --tags)" -o /bin/mkcert

WORKDIR /root/.local/share/mkcert

CMD mkcert -install && for i in $(echo $domain | sed "s/,/ /g"); do mkcert --key-file default-key.pem --cert-file default.pem $i; done && tail -f -n0 /etc/hosts