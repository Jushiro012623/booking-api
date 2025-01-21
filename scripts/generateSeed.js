const { exec } = require('child_process');

// Capture command line arguments
const seedName = process.argv[2];

if (!seedName) {
  console.error('Please provide a seed name.');
  process.exit(1);
}

const command = `npx sequelize-cli seed:generate --name ${seedName}`;

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
