const API_URL = "https://cartify-api-9fme.onrender.com";

export async function listProducts() {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error");
  }
  return data;
}

export async function fetchProductById(id: Number){
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error");
  }
  return data;
}
