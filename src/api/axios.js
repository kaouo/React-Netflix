import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "87f96d5381d0eaf191c773f475ff023b",
    language: "ko-KR",
  },
});

export default instance;
