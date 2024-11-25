import { StatusBar } from "expo-status-bar";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import ProductListItem from "../components/ProductListItem";
import { useEffect, useState } from "react";
import { listProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    console.error(error);
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        showsVerticalScrollIndicator={false}
        // className="flex-1"
      />

      <StatusBar style="auto" />
    </View>
  );
}
