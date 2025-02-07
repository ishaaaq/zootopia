import { View, Text, Alert, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native";
import { databases, config } from "@/lib/AppWrite";
import { InputField } from "@/components/NewInput";
import { useGlobalContext } from "@/lib/global-provider";
const ReportSchema = Yup.object().shape({
  issueType: Yup.string().required("Issue type is required"),
  description: Yup.string().required("Please describe the issue"),
});

const ReportForm = () => {
  const { userDetails } = useGlobalContext();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await databases.createDocument(
        config.database,
        config.reports,
        "unique()",
        {
          buyerId: userDetails.$id,
          buyerName: userDetails.zooname || userDetails.name,
          buyerEmail: userDetails.email,
          issueType: values.issueType,
          description: values.description,
          status: "pending",
          createdAt: new Date().toISOString(),
        }
      );

      Alert.alert(
        "Success",
        "Your report has been submitted. We will contact you soon."
      );
      resetForm();
    } catch (error) {
      console.log("Error submitting report:", error);
      Alert.alert("Error", "Failed to submit report. Please try again later.");
    }
  };

  return (
    <Formik
      initialValues={{ issueType: "", description: "" }}
      validationSchema={ReportSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, setFieldValue, values, errors }) => (
        <View className="p-4">
          <Text className="text-lg font-semibold">Report an Issue</Text>
          <Picker
            selectedValue={values.issueType}
            onValueChange={(itemValue) => setFieldValue("issueType", itemValue)}
            className="border p-2 my-2"
          >
            <Picker.Item label="Select an Issue" value="" />
            <Picker.Item label="Payment Issue" value="payment" />
            <Picker.Item label="Seller Misconduct" value="misconduct" />
            <Picker.Item label="Other" value="other" />
          </Picker>
          {errors.issueType && (
            <Text className="text-red-500">{errors.issueType}</Text>
          )}

          <InputField
            label="Description"
            placeholder="Describe your issue"
            value={values.description}
            onChangeText={(text) => setFieldValue("description", text)}
            multiline
            numberOfLines={4}
          />
          {errors.description && (
            <Text className="text-red-500">{errors.description}</Text>
          )}

          <TouchableOpacity
            className=" bg-primary-500 py-4 rounded-lg"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-bold">
              Submit Report
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default ReportForm;
