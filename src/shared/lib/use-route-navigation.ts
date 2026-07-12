import { useNavigation } from "react-router-dom";

export function useRouteNavigation() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";
  const nextPath = navigation.location?.pathname ?? "";

  const isNavigatingTo = (path: string) => isNavigating && nextPath === path;

  return { isNavigating, nextPath, isNavigatingTo };
}
