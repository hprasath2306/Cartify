import { Card } from "./ui/card";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";
import { Link } from "expo-router";
import { Pressable } from "react-native";

export default function ProductListItem({ product }: any) {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="flex-1 p-5 rounded-lg max-w-[360px]">
          <Image
            source={{
              uri: product.image,
            }}
            className="mb-6 h-[240px] w-full rounded-md"
            alt={`${product.name} image`}
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">
            {product.name}
          </Text>
          <Heading size="md" className="mb-4">
            Rs.{product.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}
