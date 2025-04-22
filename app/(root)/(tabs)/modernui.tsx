import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ModernUI = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Modern UI Demo</Text>
          <Text style={styles.headerSubtitle}>Blue Theme with Modern Components</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Primary Button</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Secondary Button</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.outlineButton}>
              <Text style={styles.outlineButtonText}>Outline Button</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cards</Text>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Card Title</Text>
              <Ionicons name="ellipsis-vertical" size={20} color="#0286FF" />
            </View>
            <Text style={styles.cardContent}>
              This is a modern card component with a clean design and blue accent colors.
            </Text>
            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Action</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Form Elements</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Input Field</Text>
            <View style={styles.inputField}>
              <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
              <View style={styles.inputTextPlaceholder}>
                <Text style={styles.placeholderText}>Enter your email</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation</Text>
          <View style={styles.tabBar}>
            <View style={[styles.tabItem, styles.activeTab]}>
              <Ionicons name="home" size={24} color="#0286FF" />
              <Text style={styles.activeTabText}>Home</Text>
            </View>
            <View style={styles.tabItem}>
              <Ionicons name="list-outline" size={24} color="#999" />
              <Text style={styles.tabText}>Rides</Text>
            </View>
            <View style={styles.tabItem}>
              <Ionicons name="chatbubble-outline" size={24} color="#999" />
              <Text style={styles.tabText}>Chat</Text>
            </View>
            <View style={styles.tabItem}>
              <Ionicons name="person-outline" size={24} color="#999" />
              <Text style={styles.tabText}>Profile</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF', // Light blue background
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0286FF', // Primary blue
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  buttonContainer: {
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#0286FF', // Primary blue
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#C3D9FF', // Light blue
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#0286FF', // Primary blue
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0286FF', // Primary blue
  },
  outlineButtonText: {
    color: '#0286FF', // Primary blue
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  cardButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#EBF4FF', // Very light blue
    borderRadius: 8,
  },
  cardButtonText: {
    color: '#0286FF', // Primary blue
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputTextPlaceholder: {
    flex: 1,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: 'rgba(2, 134, 255, 0.1)', // Light blue background
    borderRadius: 10,
  },
  tabText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  activeTabText: {
    fontSize: 12,
    color: '#0286FF', // Primary blue
    fontWeight: '600',
    marginTop: 5,
  },
});

export default ModernUI;
