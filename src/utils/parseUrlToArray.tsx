export function parseUrlToArray(url: string) {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  const items = [];
  let currentItem: any = {};

  for (const [key, value] of params.entries()) {
    if (key === 'slug') {
      // Nếu đã có slug trước đó, đẩy vào mảng và tạo đối tượng mới
      if (Object.keys(currentItem).length) items.push(currentItem);
      currentItem = { slug: value };
    } else if (key === 'color') {
      currentItem.color = value;
    }
  }

  // Đẩy phần tử cuối vào mảng
  if (Object.keys(currentItem).length) items.push(currentItem);

  return items;
}
