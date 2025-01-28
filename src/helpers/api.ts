import { IVenue } from "@/pages";
import axios from "axios";
import Cookies from "js-cookie";

export const LIMIT = 50;

export const fetchVenues = async (
  pageNumber: number,
  caption: string,
  hasToilet: boolean,
  hasWashroom: boolean
) => {
  const token = Cookies.get("X-Access-Token");
  const params = {
    limit: LIMIT,
    offset: pageNumber * LIMIT,
    ...(caption && { caption }),
    ...(hasToilet && { "filter[hasToilet]": hasToilet }),
    ...(hasWashroom && { "filter[hasWashroom]": hasWashroom }),
  };
  const { data } = await axios.get<IVenue[]>("/api/venues", {
    headers: { "X-Access-Token": token },
    params: params,
  });

  return data;
};

export default {
  fetchVenues,
};
