import { StyleSheet } from 'react-native';

export const corPrincipal = '#1a1a1a';
export const corSecundaria = '#d4a574';
export const corTextos = '#f2f2f2';
export const corFundo = '#0d0d0d';
export const corFundo2 = '#262626';

export const Estilos = StyleSheet.create({
  conteudo: {
    flex: 1,
    width: '100%',
    backgroundColor: corFundo,
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: corSecundaria,
    marginBottom: 16,
  },
  texto: {
    fontSize: 16,
    color: corTextos,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: corSecundaria,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: corTextos,
    marginBottom: 12,
    backgroundColor: corFundo2,
  },
  botao: {
    backgroundColor: corSecundaria,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotao: {
    color: corPrincipal,
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: corFundo,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  listItem: {
    backgroundColor: corFundo2,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftColor: corSecundaria,
    borderLeftWidth: 4,
  },
  rowBotoes: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  botaoPequeno: {
    flex: 1,
    backgroundColor: corSecundaria,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoDeletar: {
    flex: 1,
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
});