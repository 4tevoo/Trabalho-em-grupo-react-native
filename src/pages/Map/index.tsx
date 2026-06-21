import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { styles } from './style';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwitchButton from '../../components/SwitchButton';
import { useEffect, useRef, useState } from 'react';
import { obterObstaculos } from '../../services/obstaculoService';
import { Obstacle } from '../../types/obstacle';
import { Coordenadas } from '../../types/coordenadas';
import { obterLocalizacao } from '../../services/localizacaoService';

export const Map = () => {

  const [obstaculos, setObstaculos] = useState<Obstacle[]>();
  const [localizacaoUsuario, setLocalizacaoUsuario] = useState<Coordenadas>({latitude: 0, longitude: 0});
  const [carregandoGps, setCarregandoGps] = useState<boolean>(false);

    const mapaRef = useRef<MapView | null>(null);

  const carregarGps = async () => {
    setCarregandoGps(true)
    const coordenadas = await obterLocalizacao();

    if(coordenadas){
      setLocalizacaoUsuario(coordenadas);

      mapaRef.current?.animateToRegion({
        ...coordenadas,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }
    setCarregandoGps(false)
  }

  const tirarPrintMapa = async () => {
  if (!mapaRef.current) return;

  try {
    const uri = await mapaRef.current.takeSnapshot({
      width: 800,
      height: 800,
      format: 'png',
      quality: 1,
      result: 'file',
    });

    console.log(uri);
  } catch (error) {
    console.error(error);
  }
  };

  useEffect(() => {
    carregarGps();
  }, []);

  useEffect(() => {
    async () => {
      const data = await obterObstaculos();
      setObstaculos(data.data ? data.data : [])
    } 
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mapa</Text>
      <Text style={styles.subTitle}>Mapa visual</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.filterSubTitle}>Filtre pelos tipos de obstáculos:</Text>
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterButtonContainer}
        >
        <SwitchButton>Cadeirante</SwitchButton> 
        <SwitchButton>Visual</SwitchButton>
        <SwitchButton>Mobilidade Limitada</SwitchButton>
        <SwitchButton>Outros</SwitchButton>
        </ScrollView>
        <View style={styles.mapContainer}>
          <MapView 
          ref={mapaRef}
          style={styles.map}
          initialRegion={{
                latitude: localizacaoUsuario?.latitude || -22.2855, 
                longitude: localizacaoUsuario?.longitude || -42.5342,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
          >
            <Marker coordinate={{latitude: localizacaoUsuario.latitude, longitude: localizacaoUsuario.longitude}}></Marker>
          </MapView>
          <TouchableOpacity style={styles.cameraButton} onPress={tirarPrintMapa}>
            <Ionicons name='camera' size={26} color='#F8F9FA'></Ionicons>
          </TouchableOpacity>
        </View>
        <View style={styles.accessibilityLevelCaption}>
          <View style={styles.captionTextWrapper}><Ionicons name='ellipse' size={18} color='#109D57'/><Text style={styles.captionText}>Resolvido</Text></View>
          <View style={styles.captionTextWrapper}><Ionicons name='ellipse' size={18} color='#FABD03'/><Text style={styles.captionText}>Intermediário</Text></View>
          <View style={styles.captionTextWrapper}><Ionicons name='ellipse' size={18} color='#D83025'/><Text style={styles.captionText}>Inacessível</Text></View>
        </View>
      </View>
        <TouchableOpacity style={styles.accessibleMapButton}><Ionicons name='list' size={26} color='#F8F9FA'/><Text style={styles.accessibleMapButtonText}>Modo de lista para baixa visão</Text></TouchableOpacity>
    </ScrollView>
  )
}

