import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import MapView, {Marker} from 'react-native-maps';
import { SvgUri, Polygon } from 'react-native-svg';
import * as Location from 'expo-location';
import api from '../../services/api';

interface Item {
    id: number;
    title: string;
    image_url: string;
}
interface Point {
    id: number;
    name: string;
    image: string;
    image_url: string;
    latitude: number;
    longitude: number;
}

interface Params {
    uf: string;
    city: string;
}

const Points = ()=>{

    const navigation = useNavigation();
    const [items, setItems] = useState<Item[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [selectedItems, setSelectedItems] =useState<number[]>([]);
    const [initalPosition, setInitialPosition] = useState<[number, number]>([0,0]);

    const route = useRoute();
    const routeParams = route.params as Params;

    useEffect(()=>{
            async function loadPosition(){
                const { status } = await Location.requestPermissionsAsync();

                if(status !== 'granted'){
                    Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização');
                    return;
                }
                
                const location = await Location.getCurrentPositionAsync();
                const { latitude, longitude } = location.coords;
                setInitialPosition([latitude, longitude]);
            }
            loadPosition();
    }, []);

    useEffect(()=>{
        api.get('/items').then(response=>{
            setItems(response.data)
        });
    }, []);

    useEffect(()=>{
        api.get('points', {
            params: {
                city: routeParams.city,
                uf: routeParams.uf,
                items: selectedItems
            }
        }).then(response=>{
            setPoints(response.data)
        });
    }, [selectedItems]);

    function handleNavigateBack(){
        navigation.goBack();
    }
    function handleNavigateToDetail(id: number){
        navigation.navigate('Detail', { point_id : id});
    }

    function handleSelectItem(id: number){
        const alreadySelected = selectedItems.findIndex(item=> item === id);
        if (alreadySelected>=0){
            const filteredItems = selectedItems.filter(item => item != id);
            setSelectedItems(filteredItems);
        }
        else{
            setSelectedItems([...selectedItems, id]);
        }

    }
    
    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb29"/>
                </TouchableOpacity>
                <Text style={styles.title}>Bem-vindo.</Text>
                <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>
                <View style={styles.mapContainer}>
                    { initalPosition[0] !== 0 && (
                         <MapView style={styles.map} initialRegion={{latitude: initalPosition[0], longitude: initalPosition[1], latitudeDelta:0.014, longitudeDelta:0.014}} >
                            
                                {points.map(point=>(
                                    <Marker key={String(point.id)} coordinate={{latitude: point.latitude, longitude: point.longitude}} style={styles.mapMarker} onPress={()=>handleNavigateToDetail(point.id)}>
                                        <View style={styles.mapMarkerContainer}>
                                            <Image source={{ uri: point.image_url }} style={styles.mapMarkerImage} />
                                            <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                                        </View>
                                    </Marker>
                                ))}
                            
                        </MapView>
                    ) }
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:20}}>
                    {items.map(item=>(
                        <TouchableOpacity key={String(item.id)} style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]} 
                            activeOpacity={0.6} 
                            onPress={()=>handleSelectItem(item.id)}
                        >
                            <SvgUri uri={item.image_url} height={42} width={42} />
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

export default Points;