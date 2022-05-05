export async function makeImage(url: string): Promise<HTMLImageElement> {
  const image = new Image();

  image.src = url;

  await image.decode();

  return image;
}

export async function makeImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = async () => resolve(await makeImage(reader.result as string));

    reader.readAsDataURL(file);
  });
}

export async function makeImageFromSize(width: number, height: number): Promise<HTMLImageElement> {
  const image = await makeImage(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAQAAAAnZu5uAAAAAXNSR0IArs4c6QAAABVJREFUeJxiYPgPhyQwAQAAAP//AwCgshjoJhZxhgAAAABJRU5ErkJggg=='
  );

  image.width = width;
  image.height = height;

  return image;
}
