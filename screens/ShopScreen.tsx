import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {NavigationProp} from "@react-navigation/native"
import React, {useEffect, useState} from "react";
import firebase from "firebase/compat"


type ShopScreenProps = {
  navigation: NavigationProp<any, 'Profile'>;
}
type ProductType = {
  title: string;
  img: string;
}

export const ShopScreen = ({navigation}: ShopScreenProps) => {

  const [products, setProducts] = useState<{ title: string; img: string; }[]>([]);

  const items = products.map((pr: ProductType) => (
    <View style={styles.itemsWrapper}>
      <Image
        style={styles.img}
        source={{uri: pr.img}}
      />
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
        }}
      >
        <Text style={styles.buttonText}>{pr.title}</Text>
      </TouchableOpacity>
    </View>
  ));

  // Получение ссылки на нужную коллекцию в Cloud Firestore
  const db = firebase.firestore();
  const productsRef = db.collection('products');

  // Получение данных из коллекции
  useEffect(() => {
    productsRef.get()
      .then(querySnapshot => {
        const productsData: { title: string, img: string }[] = [];
        querySnapshot.forEach(pr => {
          // Обработка каждого документа (продукта)
          const product = pr.data() as ProductType;
          productsData.push(product);
        });
        setProducts(productsData);
      })
      .catch(error => Alert.alert('Erddror while loading products', error.message));
  }, [])

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Shop</Text>
          {items}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    paddingTop: 50
  },
  title: {
    fontSize: 30
  },
  itemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    width: 250,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  img: {
    marginLeft: 16,
    width: 250,
    height: 250
  },
  buttonText: {
    fontSize: 20,
  }
});