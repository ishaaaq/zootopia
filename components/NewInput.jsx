import { Text, TextInput, View } from "react-native";

export const InputField = ({
  label,
  placeholder,
  onChangeText,
  onBlur,
  value,
  error,
  touched,
  ...props
}) => (
  <View className="mb-6">
    <Text className="text-gray-700 mb-2">{label}</Text>
    <TextInput
      className="bg-white p-4 rounded-lg border border-gray-300"
      placeholder={placeholder}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      {...props}
    />
    {touched && error && <Text className="text-red-500 mt-2">{error}</Text>}
  </View>
);
