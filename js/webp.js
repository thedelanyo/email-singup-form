let refs = {};

refs.imagePreviews = document.getElementById("previews");
refs.fileSelector = document.getElementById("file");

let addImageBox = (container) => {
  let imageBox = document.createElement("div");
  container.appendChild(imageBox);

  return imageBox;
};

let processFile = (file) => {
  if (!file) {
    return;
  }

  let imageBox = addImageBox(refs.imagePreviews);

  new Promise((resolve, reject) => {
    let rawImage = new Image();

    rawImage.onload = () => {
      resolve(rawImage);
    };

    rawImage.src = URL.createObjectURL(file);
  })
    .then((rawImage) => {
      return new Promise((resolve, reject) => {
        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");

        canvas.width = rawImage.width;
        canvas.height = rawImage.height;
        context.drawImage(rawImage, 0, 0);

        canvas.toBlob((blob) => {
          resolve(URL.createObjectURL(blob));
        }, "image/webp");
      });
    })
    .then((imageURL) => {
      return new Promise((resolve, reject) => {
        let scaledImg = new Image();

        scaledImg.onload = () => {
          resolve(scaledImg);
        };

        scaledImg.setAttribute("src", imageURL);
        console.log(scaledImg);
      });
    })
    .then((data) => {
      imageBox.innerHTML = "";
      imageBox.appendChild(data);
    });
};

let processFiles = (files) => {
  for (let file of files) {
    processFile(file);
  }
};

refs.fileSelector.onchange = () => {
  processFiles(refs.fileSelector.files);
  refs.fileSelector.vale = "";
};
