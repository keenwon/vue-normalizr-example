export default function fetch (url: string): Promise<any> {
  return window.fetch(url)
    .then((response: Response) => {
      return response.json();
    });
};
