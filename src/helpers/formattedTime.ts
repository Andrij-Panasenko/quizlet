export const formatedTime = (totalSec: number) => {
    const seconds = totalSec % 60;
    const minites = Math.floor((totalSec % 3600) / 60);
    const hours = Math.floor(totalSec / 3600);

    return `${String(hours).padStart(2, '0')}:${String(minites).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`;
};
  
