const { exec } = require('child_process');

// Capture command line arguments
const modelName = process.argv[2];
const attributes = process.argv[3];

if (!modelName || !attributes) {
  console.error('Please provide both model name and attributes.');
  process.exit(1);
}

const command = `npx sequelize-cli model:generate --name ${modelName} --attributes ${attributes}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
