import nodeWebcam from "node-webcam";
import terminalImage from "terminal-image";
import fs from "fs";

const webcamInTerminal = (dirName = "webcam-in-terminal", i = 0) => {
  if (i === 0 && fs.existsSync(dirName)) {
    fs.readdir(dirName, (err, files) => {
      for (const file of files) {
        fs.unlinkSync(`${dirName}/${file}`);
      }
    });

    fs.rmdir(dirName, () => {});
  }

  if (i === 0) fs.mkdir(dirName, () => {});

  nodeWebcam.capture(`${dirName}/${i}`, { callbackReturn: "base64" }, (err) => {
    if (err) return console.error(err);
    terminalImage.file(`${dirName}/${i}.jpg`).then((res) => console.log(res));
    if (i - 1 >= 0) fs.unlinkSync(`${dirName}/${i - 1}.jpg`);
    printWebcamInTerminal(dirName, i + 1);
  });
};

webcamInTerminal();
