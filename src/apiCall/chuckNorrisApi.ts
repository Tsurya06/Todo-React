import axios from "axios";

export const fetchData = async () => { 
  try {
    const options = {
      method: "GET",
      url: "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random",
      headers: {
        accept: "application/json",
        "X-RapidAPI-Key":
          "8732c42dafmsh3656945f7cfd503p14ab0ajsn479198176027",
        "X-RapidAPI-Host":
          "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    return response.data;   
  } catch (error) {
    console.error(error);
  }
};

export const fetchHindiJoke = async () => { 
    try {
      const url = "https://hindi-jokes-api.onrender.com/jokes?api_key=54d599c851e6e7306482c28a0bb9";
      const response = await axios.get<any>(url).then(response => response.data);
      console.log(response);
      return response;   
    } catch (error) {
      console.error(error);
    }
  };


