import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { exportDataFromLocalStorage } from './exportDataFromLocalStorage';

describe('exportDataFromLocalStorage', () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    } as unknown as Storage;

    global.URL.createObjectURL = vi.fn().mockReturnValue('mock-url');

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'a') {
        return {
          href: '',
          download: '',
          click: vi.fn(),
        } as unknown as HTMLAnchorElement;
      }

      return document.createElement(tagName);
    });

    // @ts-ignore
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => {});
    // @ts-ignore
    vi.spyOn(document.body, 'removeChild').mockImplementation(() => {});

    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should export data to a file when data is present in localStorage', () => {
    const mockData = '{"test":"value"}';

    // @ts-ignore
    localStorage.getItem.mockReturnValue(mockData);

    exportDataFromLocalStorage('localStorageItem');

    expect(localStorage.getItem).toHaveBeenCalledWith('localStorageItem');
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalled();
  });

  it('should not attempt to export data when no data is present in localStorage', () => {
    // @ts-ignore
    localStorage.getItem.mockReturnValue(null);

    exportDataFromLocalStorage('myDataItem');

    expect(localStorage.getItem).toHaveBeenCalledWith('myDataItem');
    expect(URL.createObjectURL).not.toHaveBeenCalled();
    expect(document.createElement).not.toHaveBeenCalledWith('a');
    expect(document.body.appendChild).not.toHaveBeenCalled();
    expect(document.body.removeChild).not.toHaveBeenCalled();
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
  });
});
