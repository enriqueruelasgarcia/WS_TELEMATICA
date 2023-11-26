import { MapContainer, TileLayer, Marker,Popup} from 'react-leaflet';

export default function Map() {
  const coordinates = [19.2499694824219, -103.727142333984];
  return (
    <MapContainer center={coordinates} zoom={13} style={{ height: '400px', width: '100%'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>
          <div>
             <p>Estaci&oacute;n: Jws-telem&aacute;tica-ruelas</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}