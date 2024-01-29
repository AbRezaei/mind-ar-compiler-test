import { Worker } from 'worker_threads';

const fileUrls = ['target.png'];

function run() {
    const worker = new Worker('./compile-worker.js', {
        workerData: fileUrls,
    });

    return new Promise((resolve, reject) => {
        worker.on('message', (result) => {
            resolve(result);
        });

        worker.on('error', (error) => {
            reject(error);
        });
    });
}

let result = await run();

console.log(result);
