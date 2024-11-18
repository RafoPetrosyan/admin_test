import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

type SignInFormData = {
   email: string;
   password: string;
};

const SignInScreen: React.FC = () => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<SignInFormData>();

   const onSubmit = (data: SignInFormData) => {
      console.log('Sign In Data:', data);
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Sign In</Text>

         {/* Email Input */}
         <Controller
            control={control}
            name="email"
            rules={{
               required: 'Email is required',
               pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
               },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
               <View style={styles.inputContainer}>
                  <TextInput
                     style={styles.input}
                     placeholder="Email"
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                  />
                  {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
               </View>
            )}
         />

         {/* Password Input */}
         <Controller
            control={control}
            name="password"
            rules={{
               required: 'Password is required',
               minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
               },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
               <View style={styles.inputContainer}>
                  <TextInput
                     style={styles.input}
                     placeholder="Password"
                     secureTextEntry
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                  />
                  {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
               </View>
            )}
         />

         {/* Submit Button */}
         <Button title="Sign In" onPress={handleSubmit(onSubmit)} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
   },
   inputContainer: {
      marginBottom: 16,
   },
   input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 4,
   },
   error: {
      color: 'red',
      fontSize: 12,
      marginTop: 4,
   },
});

export default SignInScreen;
