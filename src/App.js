import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import getRealm from "./services/realm";
import {
  Container,
  Logo,
  Title,
  Input,
  InputDesc,
  CenterView,
  Button,
  ButtonText,
  List,
} from "./styles";

import Books from "./Books";

export default function App() {
  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [idEdit, setIdEdit] = useState(null);
  const [books, setBooks] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    loadBooks = async () => {
      const realm = await getRealm();
      const data = realm.objects("Book");
      setBooks(data);
    };
    loadBooks();
  }, []);

  saveBook = async (data) => {
    const realm = await getRealm();

    const id =
      realm.objects("Book").sorted("id", true).length > 0
        ? realm.objects("Book").sorted("id", true)[0].id + 1
        : 1;

    const dadosLivro = {
      id: id,
      nome: data.nome,
      desc: data.desc,
    };

    realm.write(() => {
      realm.create("Book", dadosLivro);
    });
  };

  addBook = async () => {
    if (nome === "" || desc === "") {
      alert("Preencha Todos os Campos");
      return;
    }
    try {
      const data = { nome: nome, desc: desc };
      await saveBook(data);

      setNome("");
      setDesc("");
      Keyboard.dismiss();
    } catch (err) {
      alert(err);
    }
  };

  function editarBook(data) {
    setNome(data.nome);
    setDesc(data.desc);
    setIdEdit(data.id);
    setDisabledBtn(true);
  }

  editBook = async () => {
    if (idEdit === null) {
      alert("Você nao pode editar!");
      return;
    }

    const realm = await getRealm();

    const response = {
      id: idEdit,
      nome: nome,
      desc: desc,
    };
    await realm.write(() => {
      realm.create("Book", response, "modified");
    });

    const dadosAlterados = await realm.objects("Book").sorted("id", false);
    setBooks(dadosAlterados);
    setNome("");
    setDesc("");
    setIdEdit(null);
    setDisabledBtn(false);
    Keyboard.dismiss();
  };

  excluirBook = async (data) => {
    const realm = await getRealm();
    const ID = data.id;

    realm.write(() => {
      if (realm.objects("Book").filtered("id =" + ID).length > 0) {
        realm.delete(realm.objects("Book").filtered("id =" + ID));
      }
    });

    const livrosAtuais = await realm.objects("Book").sorted("id", false);
    setBooks(livrosAtuais);
  };

  return (
    <Container>
      <Logo>TAREFAS</Logo>

      <Title>Nome</Title>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        value={nome}
        onChangeText={(text) => setNome(text)}
      />

      <Title>Descrição</Title>
      <InputDesc
        autoCapitalize="none"
        autoCorrect={false}
        value={desc}
        onChangeText={(text) => setDesc(text)}
      />

      <CenterView>
        <Button onPress={editBook}>
          <ButtonText>Editar</ButtonText>
        </Button>
        <Button
          onPress={addBook}
          disabled={disabledBtn}
          style={{ opacity: disabledBtn ? 0.1 : 1 }}
        >
          <ButtonText>Cadastrar</ButtonText>
        </Button>
      </CenterView>

      <List
        showsVerticalScrollIndicator={false}
        keybordShouldPersistTaps="handled"
        data={books}
        keyExtrator={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Books data={item} editar={editarBook} excluir={excluirBook} />
        )}
      />
    </Container>
  );
}
