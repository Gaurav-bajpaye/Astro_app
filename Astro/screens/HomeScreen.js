
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
const SERVER_URL = "https://astro-backend-9tb4.onrender.com/?"
export default function HomeScreen({ navigation }) {
  const [astrologers, setAstrologers] = useState([]);
  const [name, setName] = useState('');

  const [expertise, setExpertise] = useState('');
  const [experience, setExperience] = useState();

  const fetchAstrologers = async () => {
    let queryString = SERVER_URL;
    if(expertise){
      queryString += `expertise=${expertise}&`
    }
    if(experience){
      queryString += `experience=${experience}&`
    }
    if(name){
      queryString += `name=${name}&`
    }
    try {
      
      const response = await fetch(
        queryString
      );
      
      const data = await response.json();
      setAstrologers(data.astrologers);
      
    } catch (error) {
      console.error("Error fetching astrologers:", error.message);
    }
  };

  useEffect(() => {
    fetchAstrologers();
  }, [ name, expertise, experience]);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with Astrologer</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>₹117</Text>
        </View>
      </View>
      <FlatList
        data={astrologers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('DetailScreen', { astrologerId: item._id })
            }
          >
            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri: item.profileImageUrl || 'https://media1.thrillophilia.com/filestore/upzxe7mh06h655o90mi8lp6gspnv_1645512040_facebook.com_imgworld.jpg?w=400&dpr=2', 
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.expertise}>{item.expertise}</Text>
                <Text style={styles.language}>{item.language}</Text>
                <Text style={styles.experience}>
                  Exp: {item.experience} Years
                </Text>
              </View>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{item.price}/min</Text>
              {item.discountedPrice && (
                <Text style={styles.discountedPrice}>
                  ₹{item.discountedPrice}/min
                </Text>
              )}
              <TouchableOpacity style={styles.chatButton}>
                <Text style={styles.chatButtonText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fdd835',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  balanceContainer: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  expertise: {
    fontSize: 14,
    color: '#666',
  },
  language: {
    fontSize: 14,
    color: '#666',
  },
  experience: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d32f2f',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  chatButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});



