import { ScrollView, Text, View } from "react-native";

const About = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 40,
          marginTop: 50,
          textAlign: "center",
        }}
      >
        ABOUT US
      </Text>
      <ScrollView style={{ margin: 20 }}>
        <Text>
          Introducing SSIMM Sync, a groundbreaking app designed to revolutionize
          slope monitoring and landslide prevention, seamlessly integrated with
          the Soil Stability Indicator and Monitoring Machine (SSIMM). SSIMM
          goes beyond just measuring moisture content—it also monitors the tilt
          of the slope, providing a complete understanding of its condition. By
          analyzing both the soil's moisture levels and the incline, SSIMM Sync
          delivers real-time data to assess whether a slope is stable or at risk
          of causing a landslide.
        </Text>

        <Text style={{ marginVertical: 10 }}>
          With SSIMM Sync, you can store and compare past findings without
          altering the live stats displayed on the SSIMM device. Whether you're
          managing a construction site, living near vulnerable terrain, or
          working in disaster preparedness, SSIMM Sync equips you with the
          insights needed to predict potential landslides and act before they
          happen. Stay informed, stay prepared, and stay ahead of nature’s
          challenges—because with SSIMM Sync, slope safety has never been
          clearer, smarter, or more accessible. Empower your safety, one slope
          at a time.
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 40,
            textAlign: "center",
            marginVertical: 20,
          }}
        >
          PROPONENTS
        </Text>
        <Text>Jude Randulfh Abais Odo</Text>
        <Text>JBrynn Jaeda S. Villa</Text>
        <Text>JAndrea T. Cueva</Text>
        <Text>Jenny E. España</Text>
        <Text>Eunice Claire B. Busiños</Text>
        <Text>Karol Gayle D. Gabalfin</Text>
        <Text>Rowell V. Tamondong Jr.</Text>
        <Text>Anna Mae R. Acuña</Text>
      </ScrollView>
    </View>
  );
};

export default About;
