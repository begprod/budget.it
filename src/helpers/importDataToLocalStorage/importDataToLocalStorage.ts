export function importDataToLocalStorage(itemName: string) {
  return new Promise<void>((resolve, reject) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';

    fileInput.onchange = function (event: Event) {
      const { files } = event.target as HTMLInputElement;

      if (!files || files.length === 0) {
        return reject(new Error('No files selected'));
      }

      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const { result } = event.target as FileReader;

        localStorage.setItem(itemName, result as string);

        resolve();
      };

      reader.onerror = () => reject(new Error('File read error'));

      reader.readAsText(file);
    };

    fileInput.click();
  });
}
