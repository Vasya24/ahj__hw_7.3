export default class ImageWidget {
  constructor() {
    this.fileBox = document.querySelector('.overlap');
    this.input = document.getElementById('file');
    this.previewBox = document.querySelector('.preview-box');
  }

  action() {
    this.fileBox.addEventListener('dragover', (event) => {
      event.preventDefault();
      this.fileBox.classList.add('overlap-dnd');
    });
    this.fileBox.addEventListener('drop', (event) => {
      event.preventDefault();
      this.fileBox.classList.remove('overlap-dnd');
      if (this.previewBox.children.length === 3) return;
      const { files } = event.dataTransfer;
      this.showPreview(files);
    });
    this.fileBox.addEventListener('click', () => {
      this.input.dispatchEvent(new MouseEvent('click'));
    });
    this.input.addEventListener('change', (event) => {
      if (this.previewBox.children.length === 3) return;
      const { files } = event.currentTarget;
      this.showPreview(files);
      this.input.value = '';
    });
  }

  showPreview(files) {
    files.forEach((el) => {
      const preview = document.createElement('div');
      preview.classList.add('preview');
      const image = document.createElement('img');
      const deleteButton = document.createElement('div');
      deleteButton.classList.add('delete-button');
      image.classList.add('preview-image');
      image.src = URL.createObjectURL(el);
      preview.appendChild(image);
      preview.appendChild(deleteButton);
      this.previewBox.appendChild(preview);
      deleteButton.addEventListener('click', () => {
        deleteButton.parentElement.parentElement.removeChild(deleteButton.parentElement);
      });
    });
  }
}
