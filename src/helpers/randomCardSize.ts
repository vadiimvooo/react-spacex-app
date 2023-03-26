export function generateSize() {
  const sizes = ['small', 'medium', 'large'];
  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex];
}