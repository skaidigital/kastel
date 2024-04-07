export const apiRouteQuery = async (route: string, body: any) => {
  try {
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((res) => res.json());

    return response;
  } catch (error) {
    console.error(error);
  }
};
