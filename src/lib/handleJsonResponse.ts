export async function handleJsonResponse<T>(response: Response): Promise<T> {
  try {
    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      const errorMessage = json.error ?? response.statusText;
      throw new Error(errorMessage);
    }
  } catch (e) {
    throw {
      message: (e as unknown as any).message,
      status: response.status,
    };
  }
}
