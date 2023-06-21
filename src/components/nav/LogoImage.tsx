import {Image} from "react-native"

export const LogoImage = () => {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./../../assets/img/catYellow.jpg')}
    />
  );
}