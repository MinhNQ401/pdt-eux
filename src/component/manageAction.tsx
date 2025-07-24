export default function ManageAction(product, dispatch) {
  switch (dispatch.type) {
    case "add": {
      return [
        ...product,
        { id: dispatch.id, name: dispatch.name, price: dispatch.price },
      ];
    }
    case "remove": {
      return product.filter((t) => t.id !== dispatch.id);
    }
  }
}
