import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './App/Navigation'
import { Storage } from './App/local storage';

const App = () => {


	useEffect(() => {
		CHECK_USER();
	}, []);

	const CHECK_USER = async () => {
		const account_info = await Storage.getItem('fcmToken');
		console.log('fcmToken====================', account_info);
	}

	return (
		<View style={styles.container} >
			<Navigation />
		</View>
	)
}

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})