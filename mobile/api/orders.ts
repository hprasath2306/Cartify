import { useAuth } from "@/store/authStore";

const API_URL = "http://10.0.2.2:3000";

export async function createOrder(items: any[]) {
  const token = useAuth.getState().token;
  console.log(token);
  console.log(items);
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ order: {}, items }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error("Error");
  }

  return data;
}
