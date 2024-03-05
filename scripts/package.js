const fs = require('fs');
const childProcess = require('child_process');


const packageFilePath = __dirname + '/../projects/nextsapien-component-lib/package.json';
let finalJson = null;
let originalJsonBackup = null;

const hasArg = !!process.argv[2] && !!process.argv[3];
const version = process.argv[3];

if (version !== 'major' && version !== 'minor' && version !== 'patch' && hasArg) {
  console.log(
    `
Wrong params:
Accepted param:
     \t -v : 'major' | 'minor' | 'patch'
  `)
  process.exit(-1);
}

try {
  fs.readFile(packageFilePath, {encoding: 'utf-8'}, (error, data) => {
    const jsonObjet = JSON.parse(data);
    originalJsonBackup = JSON.parse(data);

    incrementPackage(jsonObjet).then(() => {
      childProcess.exec('npm run build_lib', (ex, stdout, stderr) => {
        console.log(ex);
        console.log('======');
        console.log(stdout);
        console.log('======');
        console.log(stderr);
      })
    });
  })
} catch (e) {
  console.log(`There was some error while updating the package ${version ?? 'patch'} version`);
  console.error('Exception', e.toString());
}




function incrementPackage(jsonObjet) {
  return new Promise((res, rej) => {
    let packageVersion = jsonObjet['version'].split('.'); // Major.minor.patch

    if (version === 'major') {
      packageVersion[0] = +packageVersion[0] + 1;

    } else if (version === 'minor') {
      packageVersion[1] = +packageVersion[1] + 1;

    } else {
      packageVersion[2] = +packageVersion[2] + 1;
    }


    jsonObjet['version'] = packageVersion.join('.');

    finalJson = jsonObjet;

    fs.writeFile(packageFilePath, JSON.stringify(finalJson, null, 2), {encoding: 'utf-8', flag: 'w'}, () => {
      res();
    });
  })
}
