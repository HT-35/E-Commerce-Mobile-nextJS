export const checkMissingData = async (request: Request) => {
  const textData = await request.text();

  if (textData.length > 0) {
    return await JSON.parse(textData);
  } else {
    return null;
  }
};
