import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ItemComponent = ({ item, onPress, clickCount }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text>ID: {item.id} | Title: {item.title} | Clicks: {clickCount !== undefined ? clickCount : 0}</Text>
  </TouchableOpacity>
);

const ListComponent = ({ data, onItemPress, clickCounts }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <ItemComponent item={item} onPress={() => onItemPress(item)} clickCount={clickCounts[item.id]} />
    )}
    keyExtractor={item => item.id}
  />
);

const MapListComponent = ({ data, onItemClick, clickCounts }) => (
  <View>
    {data.map(item => (
      <ItemComponent key={item.id} item={item} onPress={() => onItemClick(item)} clickCount={clickCounts[item.id]} />
    ))}
  </View>
);

const InputField = ({ placeholder, value, onChangeText, onSubmitEditing }) => (
  <TextInput 
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    onSubmitEditing={onSubmitEditing}
    style={styles.input}
  />
);

const SortButton = ({ onSort, label }) => (
  <TouchableOpacity onPress={onSort} style={styles.button}>
    <Text>{label}</Text>
  </TouchableOpacity>
);

export default function App() {
  const [list1, setList1] = useState([
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
    { id: '5', title: 'Item 5' }
  ]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [newItemText, setNewItemText] = useState('');
  const [clickCounts, setClickCounts] = useState({});
  const [nextId, setNextId] = useState(4);

  const handleItemPress = (item) => {
    const newClickCounts = { ...clickCounts, [item.id]: (clickCounts[item.id] || 0) + 1 };
    setClickCounts(newClickCounts);

    if (!list2.some(list2Item => list2Item.title === item.title)) {
      const newItem = { id: String(nextId), title: item.title };
      setList2([...list2, newItem]);
      setNextId(nextId + 1);
    }
  };

  const handleItemPressTwo = (item) => {
    const newClickCounts = { ...clickCounts };
    newClickCounts[item.id] = 0;

    setClickCounts(newClickCounts);
    setList2(list2.filter(list2Item => list2Item.id !== item.id));
    setList3([...list3, item]);
  };

  const handleMapItemClick = (item) => {
    const newClickCounts = { ...clickCounts, [item.id]: (clickCounts[item.id] || 0) + 1 };
    setClickCounts(newClickCounts);

    if (newClickCounts[item.id] > 4) {
      const newItemId = String(nextId);
      if (!list2.some(list2Item => list2Item.id === newItemId) && !list3.some(list3Item => list3Item.id === newItemId)) {
        setList3(list3.filter(list3Item => list3Item.id !== item.id));
        const newItem = { id: newItemId, title: item.title };
        setList2([...list2, newItem]);
        setNextId(nextId + 1);
      }
    }
  };

  const handleNewItem = () => {
    if (newItemText.trim() !== '') {
      const itemExists = [...list1, ...list2, ...list3].some(item => item.title === newItemText);
      if (!itemExists) {
        const newItem = { id: String(nextId), title: newItemText };
        setList1([...list1, newItem]);
        setNewItemText('');
        setNextId(nextId + 1);
      }
    }
  };

  const handleSort = (list, setList, ascending) => {
    const sortedList = [...list].sort((a, b) => 
      ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setList(sortedList);
  };

  const filteredList1 = list1.filter(item =>
    item.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Lista 1</Text>
        <InputField 
          placeholder="Filtro"
          value={filterText}
          onChangeText={setFilterText}
        />
        <InputField 
          placeholder="Novo Item"
          value={newItemText}
          onChangeText={setNewItemText}
          onSubmitEditing={handleNewItem}
        />
        <TouchableOpacity onPress={handleNewItem} style={styles.addButton}>
          <Text>Adicionar Item</Text>
        </TouchableOpacity>
        <SortButton onSort={() => handleSort(list1, setList1, true)} label="Ordenar Crescente" />
        <SortButton onSort={() => handleSort(list1, setList1, false)} label="Ordenar Decrescente" />
        <ListComponent data={filteredList1} onItemPress={handleItemPress} clickCounts={clickCounts} />

        <Text style={styles.title}>Lista 2</Text>
        <SortButton onSort={() => handleSort(list2, setList2, true)} label="Ordenar Crescente" />
        <SortButton onSort={() => handleSort(list2, setList2, false)} label="Ordenar Decrescente" />
        <ListComponent data={list2} onItemPress={handleItemPressTwo} clickCounts={clickCounts} />

        <Text style={styles.title}>Lista 3</Text>
        <SortButton onSort={() => handleSort(list3, setList3, true)} label="Ordenar Crescente" />
        <SortButton onSort={() => handleSort(list3, setList3, false)} label="Ordenar Decrescente" />
        <MapListComponent data={list3} onItemClick={handleMapItemClick} clickCounts={clickCounts} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#00f',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
