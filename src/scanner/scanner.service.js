export default async (data, basicAuth) => {
  try {
    let response = await fetch(`https://www.produktywsieci.gs1.pl/api/products/${data}?aggregation=SOCIAL`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    const responseJson = await response.json();
    if (response.status !== 200) {
      return { error: responseJson, status: response.status }
    } else {
      return { success: responseJson }
    }
  } catch(error) {
    return { error, status: 'Async error' }
  }
}
