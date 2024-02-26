// import React, { useEffect } from "react";
// const GOOGLE_API_KEY = "AIzaSyAf-vta0jfTIyH_Pci4ZnAUoNK_X9allxg";

// export default function MapView({ employees }) {
//   useEffect(() => {
//     if (!window.google) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
//       // script.defer = true;
//       // script.async = true;
//       script.onerror = () => {
//         console.error("Failed to load Google Maps API.");
//       };

//       document.head.appendChild(script);

//       return () => {
//         document.head.removeChild(script);
//       };
//     } else {
//       initMap();
//     }
//     //eslint-disable-next-line
//   }, []);

//   const initMap = () => {
//     const map = new window.google.maps.Map(document.getElementById("map"), {
//       center: { lat: 0, lng: 0 },
//       zoom: 2,
//     });

//     // <---------------Add markers for each employee----------->
//     employees.forEach((employee) => {
//       const position = {
//         lat: parseFloat(employee?.latitude),
//         lng: parseFloat(employee?.longitude),
//       };

//       new window.google.maps.Marker({
//         position,
//         map,
//         title: employee?.firstName + " " + employee?.lastName,
//       });
//     });
//   };

//   return (
//     <div
//       id="map"
//       style={{ width: "100%", height: "450px" }}
//       className="mt-4 rounded-md shadow-md shadow-gray-300 filter drop-shadow-md"
//     ></div>
//   );
// }

// -------------------------->
import React, { useEffect } from "react";

const GOOGLE_API_KEY = "AIzaSyAf-vta0jfTIyH_Pci4ZnAUoNK_X9allxg";

export default function MapView({ employees }) {
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&callback=initMap`;
      script.defer = true;
      script.async = true;
      script.onerror = () => {
        console.error("Failed to load Google Maps API.");
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      initMap();
    }
    //eslint-disable-next-line
  }, [employees]);

  const initMap = () => {
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

  return (
    <div
      id="map"
      style={{ width: "100%", height: "450px" }}
      className="mt-4 rounded-md shadow-md shadow-gray-300 filter drop-shadow-md"
    ></div>
  );
}
