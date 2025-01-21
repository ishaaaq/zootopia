import React, { useState, useEffect } from "react";
import { View, Text, Alert, Button } from "react-native";
import { Formik } from "formik";
import axios from "axios";
import { useRouter } from "expo-router"; // for navigation
import { InputField } from "@/components/NewInput"; // Assuming your reusable TextField component is in the same folder
import { BankDropdown, DropdownField } from "../components/NewInput";
import { Picker } from "@react-native-picker/picker";

const AccountDetails = () => {
  const router = useRouter(); // for navigation
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountSaved, setAccountSaved] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.paystack.co/bank", {
        headers: {
          Authorization: `Bearer sk_test_e017613e453e703ddc07977f126e038ddfe3844e`,
        },
      })
      .then((response) => {
        setBanks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching banks:", error);
      });
  }, []);

  // Mock API call to simulate Paystack verification (replace with actual Paystack API integration)
  const verifyAccountDetails = async (values) => {
    const bankCode = selectedBank.code; // Get the bank code from the dropdown
    const accountNumber = values.accountNumber;
    try {
      const response = await axios.post(
        "https://api.paystack.co/transfer/verify",
        { account_number: accountNumber, bank_code: bankCode },
        {
          headers: {
            Authorization: `Bearer ${YOUR_SECRET_KEY}`,
          },
        }
      );
      const accountName = response.data.data.account_name;
      Alert.alert("Account Verified", `Account Holder: ${accountName}`, [
        { text: "OK", onPress: () => saveAccount(accountName, values) },
        { text: "Not My Account", onPress: () => clearForm() },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        "Account verification failed. Please check the details."
      );
    }
  };

  const saveAccount = (accountName, values) => {
    setAccountHolderName(accountName);
    setAccountSaved(true);
  };

  const clearForm = () => {
    setAccountSaved(false);
  };

  return (
    <View className="p-4">
      {accountSaved ? (
        <View className="mt-4">
          <Text className="text-xl font-semibold">Account Details</Text>
          <Text className="mt-2">Bank: {accountHolderName}</Text>
          <Text className="mt-1">Account Holder: {accountHolderName}</Text>
        </View>
      ) : (
        <Formik
          initialValues={{ bankName: "", accountNumber: "" }}
          onSubmit={verifyAccountDetails}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text className="text-lg font-semibold">
                Enter Account Details
              </Text>
              {/* 
              <BankDropdown
                label="Select Bank"
                options={banks}
                selectedValue={selectedBank}
                onSelect={setSelectedBank}
              /> */}

              {banks.length > 0 ? (
                <Picker
                  selectedValue={selectedBank}
                  onValueChange={(itemValue) => setSelectedBank(itemValue)}
                >
                  {banks.map((bank) => (
                    <Picker.Item key={bank.id} label={bank.name} value={bank} />
                  ))}
                </Picker>
              ) : (
                <Text>Loading banks...</Text>
              )}

              <InputField
                label="Account Number"
                value={values.accountNumber}
                onChangeText={handleChange("accountNumber")}
                onBlur={handleBlur("accountNumber")}
                placeholder="Account Number"
                keyboardType="numeric"
              />

              <Button
                title="Verify with Paystack"
                onPress={handleSubmit}
                disabled={!values.bankName || !values.accountNumber}
              />
            </View>
          )}
        </Formik>
      )}
    </View>
  );
};

export default AccountDetails;
