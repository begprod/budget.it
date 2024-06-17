export function importDataToLocalStorage(itemName: string) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/json';

  fileInput.onchange = function (event: Event) {
    if (!event.target) {
      return;
    }

    const { files } = event.target as HTMLInputElement;

    if (!files) {
      return;
    }

    const file = files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (!event.target) {
          return;
        }

        const data = event.target.result;

        localStorage.setItem(itemName, data as string);
      };

      reader.readAsText(file);

      location.reload();
    }
  };

  fileInput.click();
}
