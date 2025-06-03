import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "subtitle" | "link";
};

export default function ThemedText({
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={
        type === "default"
          ? styles.default
          : type === "title"
          ? styles.title
          : type === "link"
          ? styles.link
          : type === "subtitle"
          ? styles.subtitle
          : "text-xs font-Poppins line-clamp-1"
      }
      {...rest}
    />
  );
}

const styles = {
  default: `font-Poppins text-base`,
  title: "font-PoppinsBold text-2xl",
  link: "font-Poppins text-sm underline",
  subtitle: "font-PoppinsSemiBold text-xl",
};
