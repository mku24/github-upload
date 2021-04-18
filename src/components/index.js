import React, { useEffect } from 'react'
import fire from '../fire'
import Elert from './Elert.png'

import moment from 'moment'

import Sidebar from './Sidebar'
import Locate from './Locate'

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

// import HeatmapLayer from "react-google-maps/lib/visualization/HeatmapLayer";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";

import mapStyles from "./mapStyles";

import styled from 'styled-components'

const libraries = ["places"];

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
    lat: -37.813011,
    lng: 144.959825,
};

const LogoWrapper = styled.img`
    position: absolute;
    z-index: 5;
    top: 0.2rem;
    left: 1.5rem;
    height: 120px;
    align-items: left;
`

const Alert = () => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyBeHO3uvtYU4_0y-jK4U3yITEhKfYu8mzo",
        libraries,
    });

    const [markers, setMarkers] = React.useState([]);

    useEffect(() => {
      //ini acts like a real time listener to whats changing in the db
      fire.firestore().collection('reports').onSnapshot(snapshot => (
          setMarkers(snapshot.docs.map(doc => (
              {
                  id: doc.id,
                  data: doc.data(),
              }
          )))
      ))
    }, [])

    const [personalMarker, setPersonalMarker] = React.useState([]);
    
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((e) => {
        setPersonalMarker((current) => [
        {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            time: new Date(),
        },
        ]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    

    return (
        <> 
            <LogoWrapper src={Elert} />
            <Sidebar marker={personalMarker}/>
            <Locate 
                action={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}/>
            <Search panTo={panTo} />

            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {personalMarker.map((marker) => (
                <Marker
                    key={`${marker.lat}-${marker.lng}`}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    icon={{
                    url: `/mapMarker.svg`,
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                    }}
                />
                ))}
                
                {markers.map((marker) => (
                <Marker
                    key={marker.id}
                    position={{ lat: marker.data.location.lat, lng: marker.data.location.lng }}
                    onClick={() => {
                      setSelected(marker);
                    }}
                    icon={{
                    url: `/mapMarker.svg`,
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                    }}
                />
                ))}
                {selected ? (
                  <InfoWindow
                    position={{ lat: selected.data.location.lat, lng: selected.data.location.lng }}
                    onCloseClick={() => {
                      setSelected(null);
                    }}
                  >
                    <div>
                      <h3>{selected.data.incidentType}</h3>
                      <p>{selected.data.description}</p>
                      <p>{moment(selected.data.timeOfIncident).format('DD-MMM-YYYY, h:mm:ss a')}</p>
                    </div>
                  </InfoWindow>
                ) : null}
            </GoogleMap>
        </>
    )
}

function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => -37.813011, lng: () => 144.959825 },
        radius: 100 * 1000,
      },
    });
  
    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
  
    const handleInput = (e) => {
      setValue(e.target.value);
    };
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        console.log(lat);
        console.log(lng);
        panTo({ lat, lng });
      } catch (error) {
        console.log("😱 Error: ", error);
      }
    };
  
    return (
      <div className="search">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }

export default Alert


