import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding-top: 45px;
`;

export const Logo = styled.Text`
  font-size: 30px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-style: italic;
  font-family: fantasy;
`;
export const Title = styled.Text`
  font-size: 22px;
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;
  color: #fff;
`;
export const Input = styled.TextInput`
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 7px;
  background-color: #fff;
  border-width: 2px;
  border-color: blueviolet;
`;
export const InputDesc = styled.TextInput`
  height: 100px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 7px;
  background-color: #fff;
  border-width: 2px;
  border-color: blueviolet;
`;

export const CenterView = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;
export const Button = styled.TouchableOpacity`
  background-color: #fff;
  height: 40px;
  border-radius: 7px;
  border-width: 2px;
  border-color: blueviolet;
  padding: 5px;
`;
export const ButtonText = styled.Text`
  font-size: 17px;
  text-align: center;
`;
export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 20 },
})`
  margin-top: 15px;
`;
