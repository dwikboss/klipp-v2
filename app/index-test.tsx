import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={{ flex:1, alignItems: "center", justifyContent: "center"  }}>
      <Text style={{ color: "white", fontFamily: "MontserratAlternates-Bold", fontSize: "64", marginBottom: 25 }}>Klipp</Text>
      <Text style={{ color: "white", fontFamily: "Montserrat-Regular", fontSize: "24" }}>loading...</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({

})