import { useAppDispatch, useAppSelector } from "@/src/component/app/hook";
import {
  type Product,
  addProduct,
  editProduct,
  removeProduct,
} from "@/src/component/features/product/productSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function AddProductButton() {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [visibility, setVisibility] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <>
      <Modal
        transparent={true}
        onRequestClose={() => setVisibility(!visibility)}
        visible={visibility}
      >
        <View style={styles.popupBackground}>
          <View style={styles.popupBox}>
            <Text>Product Name</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={setNewName}
              value={newName}
              maxLength={50}
            />
            <Text>Assigned Price</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={setNewPrice}
              value={newPrice}
              maxLength={50}
            />
            <View style={styles.addButton}>
              <Button
                title="Save"
                onPress={() => {
                  const temp: Product = {
                    id: nanoid(),
                    name: newName,
                    price: newPrice,
                  };
                  dispatch(addProduct(temp));
                  setVisibility(!visibility);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Button title="+" onPress={() => setVisibility(!visibility)} />
    </>
  );
}

function EditProductButton({ p }: { p: Product }) {
  const [newName, setNewName] = useState(p.name);
  const [newPrice, setNewPrice] = useState(p.price);
  const [visibility, setVisibility] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <>
      <Modal
        transparent={true}
        onRequestClose={() => setVisibility(!visibility)}
        visible={visibility}
      >
        <View style={styles.popupBackground}>
          <View style={styles.popupBox}>
            <Text>Product Name</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={setNewName}
              value={newName}
              maxLength={50}
            />
            <Text>Assigned Price</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={setNewPrice}
              value={newPrice}
              maxLength={50}
            />
            <View style={styles.addButton}>
              <Button
                title="Save"
                onPress={() => {
                  const temp: Product = {
                    id: p.id,
                    name: newName,
                    price: newPrice,
                  };
                  dispatch(editProduct(temp));
                  setVisibility(!visibility);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setVisibility(!visibility)}>
        <FontAwesome size={28} name="gear" color={"black"} />
      </Pressable>
    </>
  );
}

export default function ManageProduct() {
  const productList = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  return (
    <>
      <FlatList
        data={productList}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.deleteButton}>
              <Pressable onPress={() => dispatch(removeProduct(item.id))}>
                <FontAwesome size={28} name="trash" color={"red"} />
              </Pressable>
              <EditProductButton p={item} />
            </View>
          </View>
        )}
      />
      <AddProductButton />
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#cacacaff",
    borderColor: "#000000",
    borderWidth: 1,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 14,
  },
  name: {
    fontSize: 20,
  },
  price: {
    fontSize: 16,
    textAlign: "right",
  },
  addButton: {
    alignItems: "center",
  },
  deleteButton: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    gap: "10",
  },
  popupBackground: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  popupBox: {
    backgroundColor: "#07d8c7ff",
    marginHorizontal: 25,
    borderRadius: 5,
    borderWidth: 2,
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
