import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CustomAlert from './CustomAlert'; // Assurez-vous que le chemin est correct

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const winner = calculateWinner(board);

  useEffect(() => {
    if (winner) {
      setAlertVisible(true);
    }
  }, [winner]);

  const handlePress = (index) => {
    if (board[index] || winner) return;
    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[index] = isXNext ? 'X' : 'O';
      return newBoard;
    });
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    return (
      <TouchableOpacity
        key={index.toString()} // Ajout d'une clé unique pour chaque carré
        onPress={() => handlePress(index)}
        style={styles.square}
      >
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const newGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.players}>
        <Text style={[styles.player, isXNext && styles.activePlayer]}>Player 1</Text>
        <Text style={[styles.player, !isXNext && styles.activePlayer]}>Player 2</Text>
      </View>
      <Text style={styles.gameTitle}>Game</Text>
      <View style={styles.board}>
        {Array(3).fill(null).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array(3).fill(null).map((_, col) => renderSquare(row * 3 + col))}
          </View>
        ))}
      </View>
      <CustomAlert
        visible={alertVisible}
        winner={winner ? `Player ${winner}` : ''}
        onDismiss={newGame}
      />
    </View>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 50,
  },
  players: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  player: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  activePlayer: {
    backgroundColor: '#add8e6',
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  board: {
    borderWidth: 1,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  winnerText: {
    fontSize: 24,
    margin: 20,
  },
});

export default TicTacToe;