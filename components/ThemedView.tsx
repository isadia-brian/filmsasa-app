import { View, Text, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  type?: "container";
};

const ThemedView = ({ type = "container", ...rest }: ThemedViewProps) => {
  return (
    <View
      {...rest}
      className={type === "container" ? styles.container : "px-0 py-0"}
    />
  );
};

export default ThemedView;

const styles = {
  container: `px-4 py-4`,
};
