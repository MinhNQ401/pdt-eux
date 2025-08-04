import { useAppSelector } from "@/src/component/app/hook";
import { type Order } from "@/src/component/features/order/orderSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

function TotalCost({ o }: { o: Order }) {
  let sum = 0;
  for (let i = 0; i < o.orderList.length; i++) {
    let temp = o.orderList[i].productPrice.slice(1);
    sum += Number(temp);
  }
  return sum;
}

function ManageOrder({ o }: { o: Order }) {
  const [detailVis, setDetailVis] = useState(false);
  return (
    <View style={styles.item}>
      <Text>{o.orderName}</Text>
      <Text>
        $<TotalCost o={o} />
      </Text>
      <Modal
        transparent={true}
        onRequestClose={() => setDetailVis(!detailVis)}
        visible={detailVis}
      >
        <View style={styles.infoBackground}>
          <View style={styles.infoBox}>
            <View style={styles.closeButton}>
              <Pressable onPress={() => setDetailVis(!detailVis)}>
                <FontAwesome name="close" size={28} color="black" />
              </Pressable>
            </View>
            <FlatList
              data={o.orderList}
              renderItem={({ item }) => (
                <View>
                  <Text>{item.productName}</Text>
                  <Text>{item.productPrice}</Text>
                  <Text>{item.amount}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setDetailVis(!detailVis)}>
        <FontAwesome name="list" size={28} color="black" />
      </Pressable>
    </View>
  );
}

export default function OrderList() {
  const orderList = useAppSelector((state) => state.order);
  return (
    <View>
      <FlatList
        data={orderList}
        renderItem={({ item }) => <ManageOrder o={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  infoBackground: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  infoBox: {
    backgroundColor: "#07d8c7ff",
    marginHorizontal: 25,
    borderRadius: 5,
    borderWidth: 2,
  },
  item: {
    backgroundColor: "#cacacaff",
    borderColor: "#000000",
    borderWidth: 1,
    padding: 10,
    marginVertical: 7,
    marginHorizontal: 14,
  },
  closeButton: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
  },
});
