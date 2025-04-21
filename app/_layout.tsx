import { Stack } from "expo-router";
import { TaskProvider } from "./TaskProvider";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TaskProvider>
  );
}