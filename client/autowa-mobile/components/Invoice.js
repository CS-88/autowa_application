import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function Invoice() {
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  const Name = 'Sultan';
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const Model = 'Toyota Prius 2014';
  const VehicleNo = '2296';
  const ODOMeter = '';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          height: 60,
          width: 180,
          backgroundColor: 'rgb(176,216,218)',
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 18 }}>Open Invoice</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              height: screenHeight * 0.8,
            }}>
            <ScrollView>
              <View style={{ padding: 20 }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 23,
                    paddingTop: 25,
                    paddingBottom: 10,
                  }}>
                  INSPECTION REPORT
                </Text>
                <View style={styles.container}>
                  <Text>Name: </Text>
                  <Text>{Name}</Text>
                </View>
                <View style={styles.container}>
                  <Text>Date: </Text>
                  <Text>{formattedDate}</Text>
                </View>
                <View style={styles.container}>
                  <Text>Model/Year: </Text>
                  <Text>{Model}</Text>
                </View>
                <View style={styles.container}>
                  <Text>Vehicle No: </Text>
                  <Text>{VehicleNo}</Text>
                </View>
                <View style={styles.container}>
                  <Text>ODO Meter: </Text>
                  <Text>{ODOMeter}</Text>
                </View>

                <View style={{ paddingTop: 30 }}>
                  <Text>Engine:</Text>
                </View>

                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Oil Level/Condition</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={true}
                    disabled={true}
                    checkedColor="black"
                    containerStyle={styles.checkbox}
                  />
                  <Text>Mount/Tenstionrs</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={true}
                    disabled={true}
                    checkedColor="black"
                    containerStyle={styles.checkbox}
                  />
                  <Text>Steering Oil Level</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Transmission Oil</Text>
                </View>

                <View style={{ paddingTop: 10 }}>
                  <Text>Electrical Accessories:</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Horn</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Wipers/Wahers</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Radio</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Heater</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={true}
                    disabled={true}
                    checkedColor="black"
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Air Conditioner</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={true}
                    disabled={true}
                    checkedColor="black"
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Temp.Gauge</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>OilLight/Gauge</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Instruments w/Light</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>SRS Function w/Light</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>ABS w/Light</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Front Light</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Rear Light</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={true}
                    disabled={true}
                    checkedColor="black"
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Power shutters</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Electrical Mirror</Text>
                </View>

                <View style={{ paddingTop: 10 }}>
                  <Text>Service Options:</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.circularCheckedCheckbox}
                  />
                  <Text style={styles.text}>Checked-in</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.circularUncheckedCheckbox}
                  />
                  <Text style={styles.text}>Tires and Wheels</Text>
                </View>

                <View style={{ paddingTop: 10 }}>
                  <Text>Cooling & Fuel System:</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Radiator Coolent</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={false}
                    disabled={true}
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>A/C Fan</Text>
                </View>
                <View style={styles.direction}>
                  <CheckBox
                    checked={true}
                    disabled={true}
                    checkedColor="black"
                    containerStyle={styles.checkbox}
                  />
                  <Text style={styles.text}>Air Filter</Text>
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 7,
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 0,
    padding: 0,
    marginBottom: 0,
  },
  circularCheckedCheckbox: {
    borderRadius: 10,
    width: 20,
    height: 20,
    backgroundColor: 'black',
  },
  circularUncheckedCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  text: {
    paddingTop: 2,
  },
});
