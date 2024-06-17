export function exportDataFromLocalStorage(itemName: string) {
  const data = localStorage.getItem(itemName);

  if (!data) {
    return;
  }

  const blob = new Blob([data], { type: 'text/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `budget.it.backup.${new Date().toLocaleDateString()}.json`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
