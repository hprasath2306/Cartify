import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useCart } from "@/store/cartStore";
import { ActivityIndicator, FlatList } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/orders";

export default function CartScreen() {
  const items = useCart((state: any) => state.items);
  const resetCart = useCart((state: any) => state.resetCart);

  const router = useRouter();

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item: any) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price, // MANAGE FORM SERVER SIDE
        }))
      ),
    onSuccess: (data) => {
      resetCart();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onCheckout = async () => {
    createOrderMutation.mutateAsync();
  };

  if (items.length === 0) {
    return <Redirect href={"/"} />;
  }

  const loading = createOrderMutation.isPending;

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) => (
        <HStack className="bg-white p-3">
          <VStack space="sm">
            <Text bold>{item.product.name}</Text>
            <Text>$ {item.product.price}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
