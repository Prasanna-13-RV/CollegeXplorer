import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {getOrders, updateOrder} from '../../axios/shop';
import {selectUser} from '../../slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
export const OrderScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('BottomTabNavigator');
        return true; // Prevent default back button behavior
      },
    );

    getOrders(user._id).then(res => {
      console.log(res.data[1].items);
      setOrders(res.data);
    });
    return () => backHandler.remove();
  }, []);

  const doPayment = (id, amount) => {
    var options = {
      description: '',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_KZ2Pqe1bSdWymA',
      amount: amount * 100,
      name: 'CollegeXplorer',
      order_id: '', //Replace this with an order_id created using Orders API.
      prefill: {
        email: `${user.email}`,
        contact: '9191919191',
        name: `${user.name}`,
      },
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        updateOrder(id).then(res => {
          getOrders(user._id).then(res => {
            console.log(res.data[1].items);
            setOrders(res.data);
          });
        });
      })
      .catch(error => {
        Alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <ScrollView style={styles.cardContainer}>
      {orders &&
        orders.map((item, index) => {
          var price = 0;
          return (
            <View
              style={styles.card}
              onPress={() => console.log('I am pressed')}>
              <View style={styles.cardContent}>
                <View key={index}>
                  <Text style={{color: '#000'}}>order ID: {item._id}</Text>
                  {item.items.map(i => {
                    price = price + i.product.productPrice * i.quantity;
                    return (
                      <Text style={{color: '#000'}}>
                        {i.product.productName} - {i.quantity}
                      </Text>
                    );
                  })}

                  <Text style={{color: '#000'}}>
                    status:{' '}
                    <Text
                      style={{
                        color:
                          item.status == 'accepted' ? '#0D9276' : '#E8751A',
                      }}>
                      {item.status}
                    </Text>{' '}
                  </Text>
                  {!item.isOrderComplete ? (
                    <TouchableOpacity
                      // disabled={item.status != 'accepted'}
                      style={[
                        styles.icon,
                        {
                          backgroundColor:
                            item.status !== 'accepted' ? '#A9A9A9' : '#68BA6A',
                        },
                      ]}
                      onPress={() => doPayment(item._id, price)}>
                      <Text style={[styles.iconText, {color: '#fff'}]}>
                        Pay {price}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={{color: '#000'}}>Paid</Text>
                  )}
                </View>
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  cardPrice: {
    fontSize: 14,
    color: '#888',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  icon: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  iconText: {
    color: '#888',
  },
});
