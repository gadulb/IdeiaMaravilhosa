import { StatusBar } from 'expo-status-bar';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { db } from './src/config/firebase';
import { TextInput } from 'react-native';
import { Button } from 'react-native-paper';

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');

  async function buscarProduto() {
    const produtosRef = collection(db, 'produto');
    const produtosSnapshot = await getDocs(produtosRef);
    const produtosLista = produtosSnapshot.docs.map(
      (doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      }
    );
    setProdutos(produtosLista);
  }

  async function cadastrarProduto() {
    if (nomeProduto == '' || descricaoProduto == '' || precoProduto == '') {
      alert('Preencha todos os campos!');
      return;
    } else{
    const mandaProduto = collection(db, "produto"); // collection é uma função do firebase que cria uma coleção no banco de dados
    const docRef = await addDoc(mandaProduto, { // addDoc é uma função do firebase que adiciona um documento no banco de dados
      nome: nomeProduto,
      descricao: descricaoProduto,
      preco: precoProduto,
      id: produtos.length + 1,
    });
    buscarProduto(); // atualiza a lista de produtos
    }
  }

  useEffect(() => {
    buscarProduto();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={{width: 100, height: 120, marginBottom: 15}} source={{uri: 'https://th.bing.com/th/id/R.a492c56440f2473c5392669acb02f5ed?rik=VZ6c1HdDrVYd0Q&riu=http%3a%2f%2fwww.lerncomputer.de%2fwp-content%2fuploads%2f2015%2f12%2fHappy-Hello-Kitty-PNG-01697.png&ehk=7yRKYNcNsdhlL0zChXkJIoVgdtk2NZ9YL6ZyRbLRkco%3d&risl=&pid=ImgRaw&r=0'}} />
      <View style={styles.lista}>
        <Text style={styles.titulo}>Listagem de Produtos</Text>
        {produtos.map((produto) => ( // produtos é um array, então é necessário fazer um map para percorrer o array
          <View key={produto.id}>
            <View style={styles.bloco}>
              <Text style={styles.informacoes}>Nome do produto: {produto.nome}</Text>
              <Text style={styles.informacoes}>Descrição do produto: {produto.descricao}</Text>
              <Text style={styles.informacoes}>Preço do produto: {produto.preco}</Text>
            </View>
            <View style={{ marginBottom: 15 }}></View>
          </View>
        ))}
      </View>
      <View style={{ marginBottom: 15 }}></View>
      <View style={styles.lista}>
        <Text style={styles.titulo}>Cadastro de Produtos</Text>
        <TextInput placeholder='Digite o nome do produto'
          style={styles.inserir}
          value={nomeProduto}
          onChangeText={(text) => setNomeProduto(text)}
        />
        <TextInput placeholder='Digite a descrição do produto'
          style={styles.inserir}
          value={descricaoProduto}
          onChangeText={(text) => setDescricaoProduto(text)}
        />
        <TextInput placeholder='Digite o preço do produto'
          style={styles.inserir}
          value={precoProduto}
          onChangeText={(text) => setPrecoProduto(text)}
        />
        <Button
          labelStyle={{ fontWeight: "bold", fontSize: 15 }}
          textColor="black"
          style={styles.botao} onPress={cadastrarProduto}>Cadastrar</Button>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lista: {
    backgroundColor: '#e5cdca',
    padding: 15,
    borderRadius: 10,
    width: '90%',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bloco: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
  },
  informacoes: {
    fontWeight: 'bold',
  },
  inserir: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#b7a4a1',
    color: 'white',
  }
});