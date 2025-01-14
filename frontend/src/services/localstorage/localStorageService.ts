export const saveToLocalStorage = (
  key: string,
  value: string,
  expirationInDays: number = 1
): void => {
  try {
    const expirationTimestamp =
      new Date().getTime() + expirationInDays * 24 * 60 * 60 * 1000; // 1 day = 24 hours
    const data = {
      value,
      expirationTimestamp,
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage for key "${key}":`, error);
  }
};

export const getFromLocalStorage = (key: string): string | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    const currentTime = new Date().getTime();

    // Check if the item has expired
    if (currentTime > parsedItem.expirationTimestamp) {
      localStorage.removeItem(key); // Remove expired item
      return null;
    }

    return parsedItem.value; // Return the stored value if not expired
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return null;
  }
};

export const deleteFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error deleting from localStorage for key "${key}":`, error);
  }
};
