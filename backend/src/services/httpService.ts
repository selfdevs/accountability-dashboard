export const generateSearchParams = (inputData: Record<string, string>): URLSearchParams => {
  const params = new URLSearchParams();
  Object.entries(inputData).forEach(([key, value]) => {
    params.append(key, value);
  });
  return params;
};

export const generateContentTypeHeader = (contentType: string): Record<"Content-Type", string> => ({
  'Content-Type': contentType,
});

export const generateAuthorizationHeader = (accessToken: string): Record<"Authorization", string> => ({
  'Authorization': 'Bearer '+accessToken,
});