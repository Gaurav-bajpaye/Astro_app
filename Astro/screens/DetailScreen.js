
// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';

// export default function DetailScreen({ route }) {
//   const { astrologerId } = route.params;
//   const [astrologer, setAstrologer] = useState(null);

//   const fetchAstrologer = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/astrologers/${astrologerId}`);
//       setAstrologer(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchAstrologer();
//   }, []);

//   if (!astrologer) return <Text>Loading...</Text>;

//   return (
//     <View>
//       <Text>Name: {astrologer.name}</Text>
//       <Text>Expertise: {astrologer.expertise}</Text>
//       <Text>Experience: {astrologer.experience} years</Text>
//       <Text>Details: {astrologer.details}</Text>
//     </View>
//   );
// }
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
const SERVER_URL = "https://astro-backend-9tb4.onrender.com"
export default function DetailScreen({ route, navigation }) {
  const { astrologerId } = route.params;
  const [astrologer, setAstrologer] = useState(null);
  
  const fetchAstrologer = async () => {
    
    try {
      const response = await fetch(SERVER_URL+`/${astrologerId}`);
      const data = await response.json()
      setAstrologer(data);
    } catch (error) {
      console.error('Error parsing JSON:', error.message);
    }
  };
  

  useEffect(() => {
    fetchAstrologer();
  }, []);

  if (!astrologer) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="share-social" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'profile_placeholder_url' }} // Replace with actual profile image URL
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{astrologer.name}</Text>
            <View style={styles.expertiseRow}>
              <Text style={styles.expertise}>{astrologer.expertise}</Text>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.language}>{astrologer.language}</Text>
            <Text style={styles.experience}>Exp: {astrologer.experience} Years</Text>
            <Text style={styles.price}>₹{astrologer.price}/min</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statItem}>
                <FontAwesome name="clock-o" size={16} color="#888" /> 76K mins
              </Text>
              <Text style={styles.statItem}>
                <FontAwesome name="phone" size={16} color="#888" /> 5K calls
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.details}>{astrologer.details}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fdd835',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  contentContainer: {
    padding: 15,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    flexDirection: 'row',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  expertiseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  expertise: {
    fontSize: 16,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#8bc34a',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  language: {
    fontSize: 14,
    color: '#666',
  },
  experience: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    fontSize: 14,
    color: '#888',
  },
  detailsContainer: {
    marginTop: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  details: {
    fontSize: 14,
    color: '#444',
  },
});
