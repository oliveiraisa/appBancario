import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Modal, StyleSheet } from 'react-native';

const SaldoDisplay = ({ saldo }) => (
  <View style={styles.saldoContainer}>
    <Text style={styles.saldoText}>Saldo: R$ {saldo.toFixed(2)}</Text>
  </View>
);

const TransacaoModal = ({ visible, message, onClose }) => (
  <Modal //prop do Modal
    transparent={true}
    visible={visible}
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>{message}</Text>
        <Pressable style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Fechar</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const App = () => {
  const [saldo, setSaldo] = useState(7320.92);
  const [valor, setValor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);//acabei não utilizando o isModalOpen
  const [mensagemModal, setMensagemModal] = useState('');

  const handleSacar = () => {
    const valorSaque = parseFloat(valor);
    if (!isNaN(valorSaque) && valorSaque > 0) {
      const multa = 0.025 * saldo;
      const novoSaldo = saldo - valorSaque - multa;
      setSaldo(novoSaldo);
      setMensagemModal(`Saque realizado. Multa aplicada: R$ ${multa.toFixed(2)}`);
      setValor('');
      setModalVisible(true);
    } else {
      setMensagemModal('Valor de saque inválido.');
      setModalVisible(true);
    }
  };

  const handleDepositar = () => {
    const valorDeposito = parseFloat(valor);
    if (!isNaN(valorDeposito) && valorDeposito > 0) {
      const bonus = 0.01 * valorDeposito;
      const novoSaldo = saldo + valorDeposito + bonus;
      setSaldo(novoSaldo);
      setMensagemModal(`Depósito realizado. Bônus aplicado: R$ ${bonus.toFixed(2)}`);
      setValor('');
      setModalVisible(true);
    } else {
      setMensagemModal('Valor de depósito inválido.');
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <SaldoDisplay saldo={saldo} />
      <TextInput
        style={styles.input}
        placeholder="Digite o valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
      />
      <Pressable style={styles.button} onPress={handleSacar}>
        <Text style={styles.buttonText}>Sacar</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleDepositar}>
        <Text style={styles.buttonText}>Depositar</Text>
      </Pressable>
      <TransacaoModal
        visible={modalVisible}
        message={mensagemModal}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  saldoContainer: {
    marginBottom: 20,
  },
  saldoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default App;
