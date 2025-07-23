import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useReducer, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import ManageAction from "../component/manageAction";
let nextID = 3;
const productList = [
  {
    id: 0,
    name: "Hamburger",
    price: "$5.99",
  },
  {
    id: 1,
    name: "Chicken Nugget",
    price: "$9.99",
  },
  {
    id: 2,
    name: "French Fries",
    price: "$2.99",
  },
];
export default function ManageProduct() {
  const [product, dispatch] = useReducer(ManageAction, productList);
  const [visibility, setVisibility] = useState(false);
  function addProduct(name: string, price: string) {
    dispatch({
      type: "add",
      id: nextID++,
      name: name,
      price: price,
    });
  }

  function removeProduct(id: number) {
    dispatch({
      type: "remove",
      id: id,
    });
  }

  function AddProductButton() {
    const [newName, setNewName] = useState("");
    const [newCost, setNewCost] = useState("");
    return (
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
              onChangeText={setNewCost}
              value={newCost}
              maxLength={50}
            />
            <View style={styles.addButton}>
              <Button
                title="Save"
                onPress={() => {
                  addProduct(newName, newCost);
                  setVisibility(!visibility);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <>
      <FlatList
        data={product}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.deleteButton}>
              <Pressable onPress={() => removeProduct(item.id)}>
                {" "}
                <FontAwesome size={28} name="trash" color={"red"} />
              </Pressable>
            </View>
          </View>
        )}
      />
      <AddProductButton />
      <Button title="+" onPress={() => setVisibility(!visibility)} />
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
    fontSize: 32,
  },
  price: {
    fontSize: 24,
    textAlign: "right",
  },
  addButton: {
    alignItems: "center",
  },
  deleteButton: {
    alignItems: "flex-end",
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
