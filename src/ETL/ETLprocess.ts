import { GraphQLClient } from 'graphql-request';

// URL першого проекту з API GraphQL
const apiUrl = 'http://localhost:3000/graphql';

// Встановлення клієнта GraphQL
const graphQLClient = new GraphQLClient(apiUrl);

// Запит GraphQL для отримання запису замовлення по ID
async function fetchOrderRecord(orderRecordId: number) {
  const query = `
    query OrderRecord($orderRecordId: Int!) {
      orderRecord(id: $orderRecordId) {
        OrderID
        OrderDateTime
        LoyaltyCardID
        SellerID
        PaymentMethod
      }
    }
  `;

  const variables = {
    orderRecordId: orderRecordId,
  };

  try {
    const data = await graphQLClient.request(query, variables);
    return data;
  } catch (error) {
    console.error('GraphQL request failed:', error.message);
    throw error;
  }
}

// Приклад використання функції для отримання запису замовлення за певним ID
const orderId = 123; // ID запису замовлення, яке ви хочете отримати
fetchOrderRecord(orderId)
  .then((orderRecord) => {
    console.log('Отриманий запис замовлення:', orderRecord);
    // Тут ви можете продовжити обробку та завантаження даних для OLAP
  })
  .catch((err) => {
    console.error('Не вдалося отримати запис замовлення:', err);
    // Обробка помилок
  });
