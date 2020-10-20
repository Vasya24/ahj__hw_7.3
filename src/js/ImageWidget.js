export default class ImageWidget {
  constructor() {
    this.fileBox = document.querySelector('.overlap');
    this.input = document.getElementById('file');
    this.previewBox = document.querySelector('.preview-box');
    this.server = 'https://ahj--hw-7-3.herokuapp.com/';
  }

  init() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.server);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const files = JSON.parse(xhr.response);
        files.forEach((el) => {
          if (el !== '.gitkeep') {
            this.showPreview(el);
          }
        });
      }
    });
    xhr.send();
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
      this.post(files);
    });
    this.fileBox.addEventListener('click', () => {
      this.input.dispatchEvent(new MouseEvent('click'));
    });
    this.input.addEventListener('change', (event) => {
      if (this.previewBox.children.length === 3) return;
      const { files } = event.currentTarget;
      this.post(files);
      this.input.value = '';
    });
  }

  post(files) {
    const formData = new FormData();
    formData.append('file', files[0]);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.server);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const link = xhr.response;
        this.showPreview(link);
      }
    });
    xhr.send(formData);
  }

  showPreview(link) {
    const preview = document.createElement('div');
    preview.classList.add('preview');
    const image = document.createElement('img');
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete-button');
    image.classList.add('preview-image');
    image.src = `${this.server}${link}`;
    preview.appendChild(image);
    preview.appendChild(deleteButton);
    this.previewBox.appendChild(preview);
    deleteButton.addEventListener('click', () => {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `${this.server}?${link}`);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          deleteButton.parentElement.parentElement.removeChild(deleteButton.parentElement);
        }
      });
      xhr.send();
    });
  }
}
