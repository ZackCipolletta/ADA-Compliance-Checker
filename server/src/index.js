async function analyzeHTML(url, data) {
  const headers = {};
  headers['Content-Type'] = 'application/json';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, body: ${responseData}`);
      const error = new Error(responseData.message || 'An error occurred');
      error.statusCode = response.status;
      error.response = responseData;
      throw error;
    }
    return { ok: true, ...responseData };
  } catch (error) {
    console.error("Error in postRequest: ", error);
    throw error;
  }
};

export default analyzeHTML;