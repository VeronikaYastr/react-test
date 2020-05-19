import React, {useEffect, useState} from 'react';
import {FlatList, ImageBackground, Text, TouchableOpacity, View, Image} from 'react-native';
import {Camera} from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [pictureUri, setPictureUri] = useState(null);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const snapPhoto = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      setPictureUri(photo.uri);
    }
  };

  const backToCamera = () => {
    setPictureUri(null);
  };

  if (pictureUri) {
    return (
      <ImageBackground
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 10,
          paddingVertical: 30
        }}
        source={{uri: pictureUri}}>
        <TouchableOpacity
          style={{
            flex: 15,
            alignSelf: 'flex-start',
          }}
          onPress={backToCamera}>
          <Icon name="times-circle" size={70} color="white"/>
        </TouchableOpacity>
        <Models
          style={{
            flex: 1,
            alignSelf: 'flex-end',
          }}
        />
      </ImageBackground>
    );
  }

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{flex: 1}}>
      <Camera
        style={{flex: 1}}
        type={type}
        ref={ref => setCamera(ref)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              marginBottom: 35,
              alignItems: 'center',
            }}
            onPress={snapPhoto}>
            <Icon name="circle" size={70} color="white"/>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

function Item({id, title, selected, onSelect}) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={{
        flex: 1,
        flexDirection: 'column',
        height: 140,
        width: 110,
        backgroundColor: 'white',
        borderRadius: 7,
        marginHorizontal: 5,
      }}
    >
      <Image
        style={{
          height: 110,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          width: 110
        }}
        source={ require("./assets/images/s1200.jpg") }
      />
      <Text
        style={{
          height: 30,
          textAlign: 'center',
          width: 110
        }}
      >{title}</Text>
    </TouchableOpacity>
  );
}

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'dscxzcz23-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Forth Item',
  },
  {
    id: '3acdsafc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '586ewa0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Models() {
  return (
    <FlatList
      data={DATA}

      horizontal={true}
      renderItem={({item}) => (
        <Item
          id={item.id}
          title={item.title}
        />
      )}
      keyExtractor={item => item.id}
    />
  )
}