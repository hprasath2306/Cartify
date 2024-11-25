import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Shop" }} />
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
