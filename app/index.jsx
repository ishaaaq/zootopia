import { Redirect } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
const Index = () => {
  const { initialRoute } = useGlobalContext();
  return initialRoute == "GetStarted" ? (
    <Redirect href={initialRoute} />
  ) : (
    <Redirect href={`(${initialRoute})`} />
  );
};
export default Index;
