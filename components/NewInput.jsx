import { Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
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

export const DropdownField = ({
  label,
  selectedValue,
  onValueChange,
  options,
  error,
  touched,
}) => (
  <View className="mb-6">
    <Text className="text-gray-700 mb-2">{label}</Text>
    <View className="bg-white rounded-lg border border-gray-300 h-13 flex justify-center">
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        className="h-13"
      >
        <Picker.Item label={`Select ${label.toLowerCase()}`} value="" />
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
    {touched && error && <Text className="text-red-500 mt-2">{error}</Text>}
  </View>
);
