import { useState, useEffect } from "react";
import axiosInstance from "../axios";


const useFetch = <T>(url = "", searchText = "") => {
  const [data, setData] = useState();
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          searchText === "" ?   url :   url + `?q=${searchText}`
        );
        setData(response.data);
      } catch (err) {
        if(err instanceof Error){
          setError(err);
        }
        

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, searchText]);

  return { data, loading, error };
};

export default useFetch;
