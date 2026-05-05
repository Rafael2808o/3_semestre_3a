import { View, Text, FlatList, Image } from "react-native";
import Hr from "./Hr";

const Aula03_Exercicio2 = () => {
    const produtos = [
        { id: 1, foto: 'https://m.media-amazon.com/images/I/610VuYNv4KL._AC_UF894,1000_QL80_.jpg', nome: 'Notebook', categoria: 'Eletrônicos', preço: 3500.00, estoque: 10 },
        { id: 2, foto: 'https://d1r6yjixh9u0er.cloudfront.net/Custom/Content/Products/54/64/54644_smartphone-redmi-note-15-5g-nfc-br-8-8gb-ram-virtual-256gb-prin_s1_639015818408077100.webp', nome: 'Smartphone', categoria: 'Eletrônicos', preço: 2500.00, estoque: 20 },
        { id: 3, foto: 'https://images.tcdn.com.br/img/img_prod/947450/camiseta_basic_color_preto_1021_1_4a739bf8de5955b412d3e004aa92dd20.jpg', nome: 'Camiseta', categoria: 'Roupas', preço: 50.00, estoque: 100 },
        { id: 4, foto: 'https://blog.123milhas.com/wp-content/uploads/2022/07/onde-comprar-sapatos-baratos-conheca-tres-polos-de-calcados-no-brasil-conexao123-1.jpg', nome: 'Tênis', categoria: 'Calçados', preço: 200.00, estoque: 50 },
    ];
    return (
        <View>
            <Hr />

            <Text> Lista com FlatList </Text>
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Image source={{ uri: item.foto }} style={{ width: 50, height: 50, marginRight: 10 }} />
                        <View>
                            <Text>{item.nome} - {item.categoria} - Preço: {item.preço} - Estoque: {item.estoque}</Text>

                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default Aula03_Exercicio2;