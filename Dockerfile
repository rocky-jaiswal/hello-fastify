FROM oven/bun:1.0

EXPOSE 3001

RUN mkdir -p /opt/app/src
WORKDIR /opt/app

ADD src /opt/app/src/
ADD package.json /opt/app/

# remove dev dependencies
RUN sed -i '22,37d' package.json

RUN bun install

CMD [ "bun", "run", "src/index.ts" ]
