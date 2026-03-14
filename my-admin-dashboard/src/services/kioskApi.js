import axios from "axios";

export const getKiosks = async () => {
  const res = await axios.get("http://localhost:3000/api/admin/kiosks");
  return res.data;
};