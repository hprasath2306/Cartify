import { Link, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/store/authStore";

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state: any) => state.items.length);

  const isLoggedIn = useAuth((s: any) => !!s.token);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () => (
              <View className="flex-row gap-4">
                {!isLoggedIn && (
                  <Link href={"/login"} asChild>
                    <Pressable className="flex-row gap-2">
                      <Icon as={User} />
                    </Pressable>
                  </Link>
                )}
                {cartItemsNum > 0 && (
                  <Link href={"/cart"} asChild>
                    <Pressable className="flex-row gap-2">
                      <Icon as={ShoppingCart} />
                      <Text>{cartItemsNum}</Text>
                    </Pressable>
                  </Link>
                )}
              </View>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "Shop" }} />
          <Stack.Screen name="product/[id]" options={{ title: "Product" }} />
          <Stack.Screen
            name="(auth)/login"
            options={{ title: "Authentication" }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
