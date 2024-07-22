const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src/assets/images/products/mousepads');

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        const oldPath = path.join(directoryPath, file);
        const newPath = path.join(directoryPath, file.replace('-luv2code', ''));

        if (file.includes('-luv2code')) {
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.log('Error renaming file:', err);
                } else {
                    console.log(`Renamed: ${file} -> ${path.basename(newPath)}`);
                }
            });
        }
    });
});
