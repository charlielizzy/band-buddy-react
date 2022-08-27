import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { render } from '@testing-library/react'

export const Maps = ({ coordinates }) => {
  const containerStyle = {
    width: '280px',
    height: '280px',
  }

  const center = {
    lat: parseFloat(coordinates.latitude),
    lng: parseFloat(coordinates.longitude),
  }
  return (
    <LoadScript googleMapsApiKey="AIzaSyCYsH2wQbqp4BMfxtnHdFwNEgt9uBE3H6g">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker
          position={{
            lat: parseFloat(coordinates.latitude),
            lng: parseFloat(coordinates.longitude),
          }}
        />
      </GoogleMap>
    </LoadScript>
  )
}
