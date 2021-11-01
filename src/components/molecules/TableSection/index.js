import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cell,
} from 'react-native-table-component';
import {Button, Gap} from '../../atoms';
const TableSection = () => {
  const tableHead = useState(['Transaksi', 'Status', 'Jumlah']);
  const tableData = useState([
    ['Order ID : D1-99994', 'Sukses', 'Rp30.000'],
    ['Order ID : D1-99994', 'Sukses', 'Rp30.000'],
    ['Order ID : D1-99994', 'Sukses', 'Rp30.000'],
    ['Order ID : D1-99994', 'Sukses', 'Rp30.000'],
  ]);

  const Status = (data, index) => {
    return <Text style={styles.textSuccess}>{data}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>13/10/2021</Text>
      <Table>
        <Row data={tableHead[0]} style={styles.head} textStyle={styles.text} />
        {tableData[0].map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => {
              return (
                <Cell
                  key={cellIndex}
                  data={
                    cellIndex === 1 ? Status(cellData, cellIndex) : cellData
                  }
                  textStyle={styles.text}
                />
              );
            })}
          </TableWrapper>
        ))}
      </Table>
      <View style={styles.total}>
        <Text>Jumlah Total </Text>
        <Text> Rp100.000</Text>
      </View>
      <View style={{marginHorizontal: 6}}>
        <Gap height={20} />
        <Button label="Withdraw" />
      </View>
    </View>
  );
};

export default TableSection;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: '#fff',
    marginTop: 15,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  head: {height: 40, borderBottomColor: '#8D92A3', borderBottomWidth: 1},
  text: {margin: 6},
  row: {flexDirection: 'row'},
  total: {margin: 6, flexDirection: 'row', justifyContent: 'space-between'},
  textSuccess: {color: '#2B9F61', margin: 6},
  date: {
    marginLeft: 6,
    fontSize: 16,
  },
});
