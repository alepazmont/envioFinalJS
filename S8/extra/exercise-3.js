/* De nuevo vamos a usar JSON SERVER para simular nuestra api en local. 
Ejecuta ``json-server --watch exercise-3.json`` y obtendremos de la url `http://localhost:3000` los datos del ejercicio.

En este caso tenemos 2 endpoints, o lo que es lo mismo, dos urls a las que llamar para recibir los datos.

El endpoint `http://localhost:3000/orders` nos devolverá una lista de pedidos de la tienda Mari & Juan 
y el endpoint `http://localhost:3000/products` que nos devuelve una lista de productos.

La intención es pintar todos los pedidos ordenados por fecha (ultimos pedidos al principio) y en los que pongamos 
tanto los productos que contiene el pedido como la cantidad pedida de cada uno de los productos.

Si os fijáis, en el endpoint de los pedidos no tenemos la información del producto, si no su id y cantidad pedida. 
Para obtener el nombre de los productos tendremos que hacer peticiones al endpoint de productos pasando el id del producto, 
por ejemplo ``http://localhost:3000/products/2``. De esta forma podremos obtener ya toda la información y pintarla en el html.
 */
const ordersAndProducts = [];

const getInfo = async () => {
  try {
    const responseOrders = await fetch("http://localhost:3000/orders");
    const resultOrders = await responseOrders.json();
    const sortedOrders = resultOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const responseProducts = await fetch("http://localhost:3000/products");
    const resultProducts = await responseProducts.json();

    const ordersWithProductNames = [];

    sortedOrders.forEach(order => {
      const orderWithNames = { id: order.id, date: order.date, products: [] };
      order.products.forEach(product => {
        const foundProduct = resultProducts.find(p => p.id == product.productId);
        let productName;
        if (foundProduct && foundProduct.name) {
          productName = foundProduct.name;
        } else {
          productName = "Producto no encontrado";
        }
        const productWithNames = { id: product.productId, quantity: product.quantity, name: productName };
        orderWithNames.products.push(productWithNames);
      });
      ordersWithProductNames.push(orderWithNames);
    });

    const ordersList = document.createElement("ul");

    ordersWithProductNames.forEach(order => {
      const orderTitle = document.createElement("h4");
      orderTitle.innerHTML = `Pedido con ID ${order.id}`

      const orderData = document.createElement("ul");
      orderData.innerHTML = `<li>Fecha: ${order.date}</li>
      <li><h4>Productos en el pedido:</h4></li>

      `;
      
      const productList = document.createElement("ul");
      order.products.forEach(product => {
        const productItem = document.createElement("li");
        productItem.innerHTML = `
        <h4>Información del producto</h4>
          <ul>
            <li>ID del producto: ${product.id}</li>
            <li>Producto: ${product.name}</li>
            <li>Cantidad: ${product.quantity}</li>
          </ul>
        `;
        productList.appendChild(productItem);
      });
      ordersList.appendChild(orderTitle);
      orderData.appendChild(productList);
      ordersList.appendChild(orderData);
    });

    document.body.appendChild(ordersList);

  } catch (error) {
    console.error("Error:", error);
  }
};

getInfo();
