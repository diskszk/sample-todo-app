# sample-todo-app

## installation

`$ git clone https://github.com/diskszk/sample-todo-app.git`

`$ cd sample-todo-app`

`$ yarn install`

`$ touch ./packages/client/.env`

```packages/client/.env
VITE_CLOUD_FUNCTIONS_WEB_API_URL=
```
and write your WebAPI URL


## usage

### server:

lint:
`$ yarn server:lint`
 or 
`$ yarn workspace server lint`

build:
`$ yarn server:build`
or
`$ yarn workspace build`

dev-server:
`$ yarn server:serve`
or
`$ yarn workspace server serve`

### client:

lint: 
`$ yarn cl:lint`
or
`$ yarn workspace client lint`

build:
`$ yarn cl:build`
or
`$ yarn workspace client build`

dev-server:
`$ yarn cl:dev`
or
`$ yarn workspace client dev`
