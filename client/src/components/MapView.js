import React, { useEffect } from "react";
import env from "react-dotenv";

// Define initMap outside of the component
const initMap = (employees) => {
  if (!window.google.maps.Marker) {
    console.error("Google Maps Marker API is not available.");
    return;
  }

  const map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });

  // Add markers for each employee
  employees.forEach((employee) => {
    const position = {
      lat: parseFloat(employee?.latitude),
      lng: parseFloat(employee?.longitude),
    };

    new window.google.maps.Marker({
      position,
      map,
      title: employee?.firstName + " " + employee?.lastName,
    });
  });
};

export default function MapView({ employees }) {
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&callback=initMap`;
      script.defer = true;
      script.async = true;
      script.onerror = () => {
        console.error("Failed to load Google Maps API.");
      };

      // Define the callback function globally
      window.initMap = () => initMap(employees);

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
        delete window.initMap;
      };
    } else {
      initMap(employees);
    }
    //eslint-disable-next-line
  }, [employees]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "450px" }}
      className="mt-4 rounded-md shadow-md shadow-gray-300 filter drop-shadow-md"
    ></div>
  );
}
