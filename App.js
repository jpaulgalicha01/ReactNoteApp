/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */




import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen from './Components/Screen';

const Stack = createNativeStackNavigator();

  function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>

          <Stack.Group>
            <Stack.Screen name="Home" component={Screen.HomeScreen} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="Add" component={Screen.AddNoteScreen} />
          </Stack.Group>

          <Stack.Group>
            <Stack.Screen name="Edit" component={Screen.EditNoteScreen} />
          </Stack.Group>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default App;
