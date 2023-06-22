import {StyleSheet, Text, View} from "react-native"
import {FC} from "react"


type Props = {
  textForLoadingData: string
}

export const EmptyComponent: FC<Props> = ({ textForLoadingData }) => {

  return (
    <View style={styled.container}>
      <Text>{textForLoadingData}</Text>
    </View>
  )
}

const styled = StyleSheet.create({
  container: {
    justifyContent: 'center'
  }
})