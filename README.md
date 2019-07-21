# prettier-parallel

# DOES NOT IMPROVE PERFORMANCE

# MY PRACTICE FOR WORKER THREADS AND PRETTIER

Runs [Prettier](https://github.com/prettier/prettier) with [Worker Threads](https://nodejs.org/api/worker_threads.html).

## Install

```
npm install --save-dev prettier-paralell
```

## Usage

```
$ node_modules/.bin/prettier-prallel.js ./src/**/*
./src/fs/readFile.ts 705ms
./src/cli.ts 731ms
./src/fs/writeFile.ts 721ms
./src/worker.ts 729ms
./src/formatWithWorker.ts 757ms
./src/main.ts 751ms
```

## LICENSE

- MIT
