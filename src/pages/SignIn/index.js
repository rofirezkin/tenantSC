import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {ICEye, ICEyeSlash} from '../../assets';
import {Button, Gap, Header, Link, TextInput} from '../../components';
import {signInAction} from '../../redux/action';
import useForm from '../../utils/useForm';

const SignIn = ({navigation}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const {device_token} = useSelector(state => state.registerReducer);

  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  console.log('devic_token', device_token);
  const dispatch = useDispatch();

  const onSubmit = () => {
    console.log('form', form);

    dispatch(signInAction(form, device_token, navigation));
  };

  return (
    <View style={styles.page}>
      <Header
        title="Sign In"
        onPress={() => navigation.goBack()}
        subtTitle="Enter Your Email And Password"
      />
      <View style={styles.container}>
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={16} />
        <TextInput
          signIn
          iconPosition="right"
          placeholder="yourpassword"
          secureTextEntry={isSecureEntry}
          label="Password"
          icon={
            <TouchableOpacity
              onPress={() => {
                setIsSecureEntry(prev => !prev);
              }}>
              <View>{isSecureEntry ? <ICEye /> : <ICEyeSlash />}</View>
            </TouchableOpacity>
          }
          value={form.password}
          onChangeText={value => setForm('password', value)}
        />
        <Gap height={24} />
        <Button label="Sign In" onPress={onSubmit} />
        <Gap height={30} />
        <Link
          title="Help Center"
          align="center"
          onPress={() => navigation.navigate('HelpCenter')}
        />
        {/* <Button
          label="Create New Account"
          color="#8D92A3"
          onPress={() => navigation.navigate('SignUp')}
        /> */}
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
