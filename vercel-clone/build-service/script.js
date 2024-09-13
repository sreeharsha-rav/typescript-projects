import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

async function init() {
  console.log('Executing script.js');
  console.log('Build process started ...');

  // Define the path to the output directory
  const outDirPath = path.join(__dirname, 'output');

  // Call child process to install dependencies and build the project
  const p = exec(`cd ${outDirPath} && npm install && npm run build`);

  // Log the output while the process is running
  p.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  // Log any errors that occur
  p.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  // Log when the process is done and upload the files to S3
  p.on('close', (code) => {
    if (code !== 0) {
      console.error(`Build process exited with code ${code}`);
      return;
    }

    console.log('Build process completed successfully');

    // Get dist folder path and read through all files and folders in it synchronously
    const distFolderPath = path.join(__dirname, 'output', 'dist');
    const distFolderContents = fs.readdirSync(distFolderPath, { recursive: true });

    for (const file of distFolderContents) {
      const filePath = path.join(distFolderPath, file);
      console.log(`File path: ${filePath}`);
      
      // skip directories
      if (fs.lstatSync(filePath).isDirectory()) continue;

      // upload file to S3 bucket
    }

  });
}  