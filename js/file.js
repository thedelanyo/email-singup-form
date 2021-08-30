let oldImg = document.getElementById("oldImg");
let newImg = document.getElementById("newImg");
let input = document.getElementById("file");
let previews = document.getElementById("previews");

let process = (file) => {
  if (!file) {
    return;
  }

  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (event) => {
    const img = document.createElement("img");
    img.src = event.target.result;

    img.onload = (e) => {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      const MAX_WIDTH = 400;
      let scale_size = MAX_WIDTH / e.target.width;
      canvas.width = MAX_WIDTH;
      canvas.height = e.target.height * scale_size;
      ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

      let srcEncoded = ctx.canvas.toDataURL(e.target, "image/webp");

      newImg.src = srcEncoded;
      console.log(srcEncoded);
    };
  };
};

let processFiles = (files) => {
  for (let file of files) {
    process(file);
  }
};

input.onchange = () => {
  processFiles(input.files);
};
