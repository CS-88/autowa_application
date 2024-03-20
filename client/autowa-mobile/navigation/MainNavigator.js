import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../components/Dashboard';
import Bookings from '../components/Bookings';
import MyCars from '../components/MyCars';
import TrackVehicle from '../components/TrackVehicle';
import Invoice from '../components/Invoice';
import ServiceRecords from '../components/ServiceRecords';
import ConfirmBookings from '../components/ConfirmBookings';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="TrackVehicle" component={TrackVehicle} />
      <Stack.Screen name="Invoice" component={Invoice} />
      <Stack.Screen name="ServiceRecords" component={ServiceRecords} />
    </Stack.Navigator>
  );
};

const BookingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bookings" component={Bookings} />
      <Stack.Screen name="ConfirmBookings" component={ConfirmBookings} />
    </Stack.Navigator>
  );
};

const MyCarsStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyCars" component={MyCars} />
      <Stack.Screen name="ServiceRecords" component={ServiceRecords} />
    </Stack.Navigator>
  )
}

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Bookings') {
            iconName = 'calendar';
          } else if (route.name === 'MyCars') {
            iconName = 'car';
          }
          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'rgb(176,216,218)' },
        headerShown: false,
      })}
      initialRouteName="Dashboard">
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Bookings" component={BookingsStack} />
      <Tab.Screen name="MyCars" component={MyCarsStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
