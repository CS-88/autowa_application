import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getVerifiedEmail } from '../services/LocalStorage';


const ServiceRecords = () => {
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    // Fetch data from backend when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customer_email = await getVerifiedEmail(); 
      const response = await fetch('https://autowa-backend.onrender.com/api/serviceRecord/get/user/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customer_email: customer_email }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setServiceData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or display error message
    }
  };

  const renderValue = (value) => {
    return value ? '✅' : '❌';
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        <Text style={styles.title}>Service Records</Text>
      </View>
      {serviceData &&
        serviceData.map((record, index) => (
          <View key={index} style={styles.card}>
            {Object.entries(record).reverse().map(([key, value]) => { // Reverse the entries for each record
              // Skip rendering for 'id', 'createdAt', and 'updatedAt' fields
              if (key === '_id' || key === 'createdAt' || key === 'updatedAt') {
                return null;
              }
              if (typeof value === 'object') {
                return (
                  <View key={key} style={styles.section}>
                    <Text style={styles.sectionTitle}>{key.replace(/_/g, ' ')}</Text>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <View key={subKey} style={styles.item}>
                        <Text style={styles.label}>{subKey.replace(/_/g, ' ')}</Text>
                        <Text style={styles.value}>{renderValue(subValue)}</Text>
                      </View>
                    ))}
                  </View>
                );
              } else {
                return (
                  <View key={key} style={styles.section}>
                    <Text style={styles.sectionTitle}>{key.replace(/_/g, ' ')}</Text>
                    <Text style={styles.value}>{String(value)}</Text>
                  </View>
                );
              }
            })}
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    gap:23,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    
  },
  label: {
    fontSize: 16,
    textTransform: 'capitalize',
  },

  value: {
    fontSize: 16,
  },
});

export default ServiceRecords;
