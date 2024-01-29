import { parentPort, workerData } from 'worker_threads';
import { loadImage } from "canvas";
import { OfflineCompiler } from "mind-ar/src/image-target/offline-compiler.js";

new Promise(async (resolve, reject) => {
    try {
        const images = await Promise.all(workerData.map(url => loadImage(url)));
        const compiler = new OfflineCompiler();
        await compiler.compileImageTargets(images, console.log);
        const buffer = compiler.exportData();
        resolve(buffer);
    }
    catch (error) {
        reject(error);
    }
})
    .then((data) => {
        parentPort.postMessage({
            success: true,
            message: 'Worker Finished.',
        });
    })
    .catch((error) => {
        parentPort.postMessage({
            success: false,
            message: `Worker Error: ${error.message}`,
        });
    });
