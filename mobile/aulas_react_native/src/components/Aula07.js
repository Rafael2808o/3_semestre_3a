import { View, Text} from "react-native";
import Hr from "./Hr";
import * as Animar from 'react-native-animatable';

const Aula07 = () => {
   
    return (
        <View>
            <Hr />
            <Text> Aula 07 - Estilos de navegação Tabs e Animações</Text>
            <Text> Criando navegação por abas e aprendendo sobre animações</Text>
            <Hr />
            <Animar.Text animation="bounceIn" iterationCount={5} direction="alternate" style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                Animação de texto com react-native-animatable
            </Animar.Text>

            <Animar.View animation="fadeInUp" iterationCount={5} direction="alternate" style={{ backgroundColor: 'blue', padding: 20, margin: 20 }}>
                <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
                    Animação de View com react-native-animatable
                </Text>
            </Animar.View>

            <Animar.Image
                animation="zoomIn"
                iterationCount={5}
                direction="alternate"
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={{ width: 100, height: 100, alignSelf: 'center' }}
            />

            <Animar.View animation="rotate" iterationCount={5} direction="alternate" style={{ backgroundColor: 'green', padding: 20, margin: 20 }}>
                <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>
                    Animação de rotação com react-native-animatable
                </Text>
            </Animar.View>

        </View>
    )
}

export default Aula07;