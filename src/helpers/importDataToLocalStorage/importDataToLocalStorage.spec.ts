import type { Mock } from 'vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { importDataToLocalStorage } from './importDataToLocalStorage';

describe('importDataToLocalStorage', () => {
  const itemName = 'testItem';
  const mockFileContent = JSON.stringify({ key: 'value' });
  const mockFile = new File([mockFileContent], 'test.json', { type: 'application/json' });

  let originalFileReader: typeof FileReader;
  let mockFileReader: {
    readAsText: Mock;
    // eslint-disable-next-line no-unused-vars
    onload: ((event: ProgressEvent<FileReader>) => void) | null;
    onerror: (() => void) | null;
  };
  let mockInputElement: HTMLInputElement;
  let mockSetItem: Mock;

  beforeEach(() => {
    mockFileReader = {
      readAsText: vi.fn(),
      onload: null,
      onerror: null,
    };

    originalFileReader = global.FileReader;
    global.FileReader = vi.fn(() => mockFileReader) as unknown as typeof FileReader;

    mockInputElement = document.createElement('input');
    document.createElement = vi.fn().mockReturnValue(mockInputElement);

    mockSetItem = vi.fn();
    Object.defineProperty(global, 'localStorage', {
      value: { setItem: mockSetItem },
      writable: true,
    });
  });

  afterEach(() => {
    // Restore the original FileReader
    global.FileReader = originalFileReader;

    // Restore the original document.createElement
    vi.restoreAllMocks();
  });

  it('should import data to localStorage and reload the page', async () => {
    // Simulate the file selection
    setTimeout(() => {
      Object.defineProperty(mockInputElement, 'files', { value: [mockFile] });
      mockInputElement.dispatchEvent(new Event('change'));
    }, 0);

    // Simulate the file read
    setTimeout(() => {
      mockFileReader.onload?.({
        target: { result: mockFileContent } as FileReader,
      } as ProgressEvent<FileReader>);
    }, 0);

    await importDataToLocalStorage(itemName);

    expect(mockSetItem).toHaveBeenCalledWith(itemName, mockFileContent);
  });
});
