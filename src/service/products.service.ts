import {Product} from '../interface'

export const getProducts = async (page = 0):Promise<Product[]> => {
  console.log("Fetching products for page:", page);
  try {
  const response = await fetch(`http://localhost:3000/products?_start=${page * 24 - 24}&_limit=24`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
        throw new Error('Fail to fetch products')
    }
  } catch (error) {
    throw new Error('Network error');
  }
};
