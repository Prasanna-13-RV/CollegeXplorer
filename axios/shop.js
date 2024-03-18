import axios from 'axios';

export const getShops = async () => {
  return await axios.get('https://busy-ruby-snail-boot.cyclic.app/api/shop');
};

export const createOrder = async (user, items, shop) => {
  return await axios.post(
    'https://busy-ruby-snail-boot.cyclic.app/api/order/insert',
    {
      user: user,
      items: items,
      shopId: shop,
    },
  );
};

export const getOrders = async user => {
  return await axios.get(
    `https://busy-ruby-snail-boot.cyclic.app/api/order/user/${user}`,
  );
};

export const updateOrder = async id => {
  return await axios.put(
    `https://busy-ruby-snail-boot.cyclic.app/api/order/update/${id}`,
  );
};

export const createAttendance = async (user, location, image) => {
  return await axios.post(
    'https://busy-ruby-snail-boot.cyclic.app/api/attendance/insert',
    {
      user: user,
      location: location,
      image: image,
      status: true,
    },
  );
};
