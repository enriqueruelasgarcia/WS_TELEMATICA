import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; 
import MapSt from './Map';
export default function Table() {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const consult = async () => {
        const { data, error } = await supabase.from('measurements').select('*');
        if (!error) {
          setDatos(data);
        } else {
          console.error( error);
        }
      } 

    consult();
  }, []); 
  
  return (
    <div>
      <div style={{textAlign:'center'}}>
      <h1 className='text-2xl font-bold'>Registros de Inserciones</h1>
      </div>
      <table style={{  width: '100%' }}>
        <thead>
          <tr>
            <th style={estiloCeldaCol1} >Folio. de Registro</th>
            <th style={estiloCeldaCol2} >Fecha de Inserción</th>
            <th style={estiloCeldaCol3} >Estación Proveniente</th>
            <th style={estiloCeldaCol4} >Latitud</th>
            <th style={estiloCeldaCol4}>Longitud</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(dato => (
            <tr key={dato.id}>
              <td style={estiloCelda} >{dato.id}</td>
              <td style={estiloCelda} >{dato.created_at}</td>
              <td style={estiloCelda} >{dato.station_id}</td>
              <td style={estiloCelda} >{dato.latitude}</td>
              <td style={estiloCelda} >{dato.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <br/>
      <MapSt></MapSt>
    </div>
    </div>
    
  )
}

const estiloCelda={
  textAlign:'left',border: '1px solid black', padding: '8px'
};
const estiloCeldaCol1={
  textAlign:'left',border: '1px solid black', padding: '8px',backgroundColor:'green'
}
const estiloCeldaCol2={
  textAlign:'left',border: '1px solid black', padding: '8px',backgroundColor:'orange'
}
const estiloCeldaCol3={
  textAlign:'left',border: '1px solid black', padding: '8px',backgroundColor:'red'
}
const estiloCeldaCol4={
  textAlign:'left',border: '1px solid black', padding: '8px',backgroundColor:'yellow'
}
