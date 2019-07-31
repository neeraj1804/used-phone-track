import React, {Component} from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width: '50%',
    height: '50%',
    position: "absolute",
    top: "30px",
    left: 0
};

const MAP = {
    defaultZoom: 2,
    options: {
      styles: mapStyles,
      maxZoom: 19,
    },
};

class GMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapOptions: {
                zoom: MAP.defaultZoom
            },
            clusters: [],
            users: []
        };
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { users } = nextProps;
        if(users !== prevState.users){
            let cluster = users.slice();
            for(let i = 0;i < cluster.length;i++){
                cluster[i] = Object.assign({}, cluster[i], {
                    showingInfoWindow: false,
                    activeMarker: {},
                    selectedPlace: {}
                });
            }
            return {
                clusters: cluster,
                users
            }
        }
        return prevState;
    }

    onMarkerClick = (index, props, marker, e) => {
        this.setState(prevState => ({
            ...prevState,
            clusters: [
                ...prevState.clusters.slice(0, index),
                {
                    ...prevState.clusters[index],
                    showingInfoWindow: true,
                    activeMarker: marker,
                    selectedPlace: props
                },
                ...prevState.clusters.slice(index+1)
            ]
        }));
    }

    onClose = (index, props) => {
        if (this.state.clusters[index].showingInfoWindow) {
            this.setState(prevState => ({
                ...prevState,
                clusters: [
                    ...prevState.clusters.slice(0, index),
                    {
                        ...prevState.clusters[index],
                        showingInfoWindow: false,
                        activeMarker: null
                    },
                    ...prevState.clusters.slice(index+1)
                ]
            }));
        }
    };

    render() {
        const initialCenter = {
            lat: this.state.clusters[0] ? this.state.clusters[0].latitude : 24.879999,
            lng: this.state.clusters[0] ? this.state.clusters[0].longitude : 74.629997
        }
        return (
            <Map
                google={this.props.google}
                defaultCenter={initialCenter}
                initialCenter={initialCenter}
                defaultZoom={MAP.defaultZoom}
                options={MAP.options}
                onChange={this.handleMapChange}
                style={mapStyles}
                zoom={4}
            >
                {this.state.clusters.map((user, index) => {
                    return (
                        <Marker
                            key={user.id}
                            position={{lat: user.latitude, lng: user.longitude}}
                            onClick={(props, marker, e) => this.onMarkerClick(index, props, marker, e)}
                            name={`${user.name}-${user.count}`}
                        >
                            
                            {user.showingInfoWindow && <InfoWindow
                                onClose={(props) => this.onClose(index, props)}
                            >
                                <div>
                                    <h4>{`${user.name}-${user.count}`}</h4>
                                    <p>{`Activation date - ${user.activationDate}`}</p>
                                </div>
                            </InfoWindow>
                            }
                        </Marker>
                    )
                })}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(GMap);