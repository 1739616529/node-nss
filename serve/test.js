const cliProgress = require('cli-progress');

// create new container
const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: ' {bar} | {filename} | {value}/{total}',
}, cliProgress.Presets.shades_grey);

// add bars
const b1 = multibar.create(200, 0);
const b2 = multibar.create(1000, 0);

// control bars
b1.increment();
b2.update(20, {filename: "test1.txt"});
b1.update(20, {filename: "helloworld.txt"});

// stop all bars
multibar.stop();