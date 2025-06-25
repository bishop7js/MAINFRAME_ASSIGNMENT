import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/profileActions';

const LABEL_WIDTH = 110;

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user: profileData, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
      }}
    >
      <Image
        source={{ uri: profileData?.image }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          marginTop: 180,
          marginBottom: 24,
        }}
      />
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 32 }}>
        {profileData?.firstName} {profileData?.lastName}
      </Text>

      <View style={{ width: '100%', maxWidth: 350 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 16, width: LABEL_WIDTH }}
          >
            Designation:
          </Text>
          <Text style={{ fontSize: 16, flex: 1 }}>
            {profileData?.company?.title || '-'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 16, width: LABEL_WIDTH }}
          >
            Works At:
          </Text>
          <Text style={{ fontSize: 16, flex: 1 }}>
            {profileData?.company?.name || '-'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 16, width: LABEL_WIDTH }}
          >
            Gender:
          </Text>
          <Text style={{ fontSize: 16, flex: 1 }}>
            {profileData?.gender || '-'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 16, width: LABEL_WIDTH }}
          >
            Contact:
          </Text>
          <Text style={{ fontSize: 16, flex: 1 }}>
            {profileData?.phone || '-'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 32,
          }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 16, width: LABEL_WIDTH }}
          >
            Studies at:
          </Text>
          <Text style={{ fontSize: 16, flex: 1 }}>
            {profileData?.university || '-'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#ff6666',
          paddingVertical: 18,
          minWidth: 220,
          borderRadius: 10,
          marginTop: 40,
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.replace('login');
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;