import { login, signup } from "@/api/auth";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { ActivityIndicator } from "react-native";
import { useState } from "react";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useAuth((s: any) => s.setUser);
  const setToken = useAuth((s: any) => s.setToken);
  const isLoggedIn = useAuth((s: any) => !!s.token);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      console.log("Success: ", data);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: () => {
      console.log("Error");
    },
  });

  const signupMutation = useMutation({
    mutationFn: () => signup(email, password),
    onSuccess: (data) => {
      console.log("Success sign up: ", data);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  if (isLoggedIn) {
    return <Redirect href={"/"} />;
  }

  const isLoading = loginMutation.isPending || signupMutation.isPending;

  return (
    <FormControl
      isInvalid={loginMutation.error || signupMutation.error}
      className="p-4 border rounded-lg max-w-[500px] border-outline-300 bg-white m-2"
    >
      <VStack space="xl">
        <Heading className="text-typography-900 leading-3 pt-3">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Email</Text>
          <Input className="text-center text-black h-50">
            <InputField
              value={email}
              onChangeText={setEmail}
              type="text"
              editable={!isLoading}
            />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Password</Text>
          <Input className="text-center text-black h-50">
            <InputField
              value={password}
              onChangeText={setPassword}
              type={showPassword ? "text" : "password"}
              editable={!isLoading}
            />
            <InputSlot className="p-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        {isLoading && (
          <ActivityIndicator size="large" color="#0000ff" className="my-4" />
        )}
        <HStack space="sm">
          <Button
            className="flex-1"
            variant="outline"
            onPress={() => signupMutation.mutate()}
            disabled={isLoading}
          >
            <ButtonText>Sign up</ButtonText>
          </Button>
          <Button
            className="flex-1"
            onPress={() => loginMutation.mutate()}
            disabled={isLoading}
          >
            <ButtonText>Sign in</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}
