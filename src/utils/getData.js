const API = process.env.API;

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    var response = await fetch(apiURl);
    var data = await response.json();
    console.log(data);
    return data.results[0];
  } catch (error) {
    console.log("Fetch Error", error, response, response.body);
  }
};

export default getData;
