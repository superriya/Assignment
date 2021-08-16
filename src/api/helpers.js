/**
 * A utility function to make a network api call
 *
 * @param {string} apiUrl
 * @return {Promise<Object>}
 */

const getIndividualData = async (data) => {
  const promises = data.map((item) => {
    const itemEl = item;
    return fetch(`http://localhost:8080${item.apiUrl}`)
      .then((response) => {
        if (response.ok) return response.json();
        return null;
      })
      .then((response) => {
        if (response && response.price) {
          itemEl.details = response;
          return itemEl;
        }
        return null;
      });
  });
  return Promise.all(promises).then((results) => results);
};

export async function request(apiUrl) {
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => getIndividualData(data))
    .then((data) => data);
}
