import React, { useState, useEffect } from "react";

import { Container, Nome, Desc, CenterView, Botao, BotaoText } from "./styles";

export default function Books({ data, editar, excluir }) {
  return (
    <Container>
      <Nome>{data.nome}</Nome>
      <Desc>{data.desc}</Desc>

      <CenterView>
        <Botao onPress={() => editar(data)}>
          <BotaoText>Editar</BotaoText>
        </Botao>

        <Botao onPress={() => excluir(data)}>
          <BotaoText>Excluir</BotaoText>
        </Botao>
      </CenterView>
    </Container>
  );
}
