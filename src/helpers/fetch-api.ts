import qs from "qs";
import { getStrapiURL } from "./api-helper";


export const fetchApi = async (
  path: string,
  urlParamsObject = {},
  options = {}
) => {
  try {
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true, // prettify URL
    });

    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error al conectar la api, verifique servidor encendido, params, etc"
    );
  }
};
